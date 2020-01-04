import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMails';

class AppointmentController{

    async index(req, res){

        const { page = 1 } = req.query;

        const qtdRegPag = 3; // Quantidade de Registros por página

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            attributes : ['id','date','past','cancelable'],
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

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        });

        //Notificação com mongo

        const user = await User.findByPk(req.userId);

        const fomartedDate = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h'", {
        locale: pt,
        });

        await Notification.create({
        content: `Novo agendamento de ${user.name} para ${fomartedDate}`,
        user: provider_id,
        });

        // Fim Notificação com mongo
      
        return res.json(appointment);

    }

    async delete(req, res){

        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
              {
                model: User,
                as: 'provider',
                attributes: ['name', 'email'],
              },
              {
                model: User,
                as: 'user',
                attributes: ['name'],
              },
            ],
          });
      
          if (appointment.user_id !== req.userId) {
            return res.status(401).json({
              error: "You don't have persmission to cancel this appointment.",
            });
          }
      
          const dateWithSub = subHours(appointment.date, 2);
      
          if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({
              error: 'You can only cancel appointments 2 hours in advance.',
            });
          }
      
          appointment.canceled_at = new Date();
      
          await appointment.save();

          //Envio de email basico
        //   await Mail.sendMail({
        //       to: `${appointment.provider.name} <${appointment.provider.email}> `,
        //       subject: 'Agendamento Cancelado',
        //       text: 'Você tem um novo cancelamento',
        //   });

        // Envio de email com template
        await Queue.add(CancellationMail.key, {
        appointment,
        });
      
        return res.json(appointment);
    }
}

export default new AppointmentController();