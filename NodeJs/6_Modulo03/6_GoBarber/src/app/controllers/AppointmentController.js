import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import { async } from '../../../../../../../../../AppData/Local/Microsoft/TypeScript/3.6/node_modules/rxjs/internal/scheduler/async';

class AppointmentController{

    async index(req, res){

        const { page = 1 } = req.query;

        const qtdRegPag = 3; // Quantidade de Registros por página

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            attributes : ['id','date'],
            limit: qtdRegPag,
            offset: (page - 1) * qtdRegPag,

            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes : ['id','name'],
                    include : [
                        {
                            model: File,
                            as: 'avatar',
                            attributes : ['id', 'path', 'url'],
                        }
                    ]
                },
            ]
        });

        return res.json(appointments);  
    
    }

    async store (req, res) {

        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
      
        const { provider_id, date } = req.body;

        // Check if provider_id is a provider
        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        if (!isProvider) {
            return res.status(401).json({ error: 'You can only create appointments with providers.' });
        }

        //parseISO converte o campo do obj json em date;
        //startOfHour pega somente a hora e ignora os minutos
        const hourStart = startOfHour(parseISO(date));

        if(isBefore(hourStart,new Date())){
            return res.status(400).json({ error: "Past dates are not permitted" });
        }

        // Verifica se data para o prestador esta disponivel
        const dateAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (dateAvailability){
            return res.status(400).json({ error: "Appointment date is not available" });    
        }

        console.log(req.userId);


        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        });
      
        return res.json(appointment);
      
    }
}

export default new AppointmentController();