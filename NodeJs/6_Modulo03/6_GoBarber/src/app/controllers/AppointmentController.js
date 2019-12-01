import * as Yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController{
    async store (req, res) {

        console.log('entrou');

        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        console.log('pos schema');

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        console.log('1');
      
        const { provider_id, date } = req.body;

        console.log('2');

        // Check if provider_id is a provider
        const isProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        console.log('3');

        if (!isProvider) {
            return res.status(401).json({ error: 'You can only create appointments with providers.' });
        }

        console.log('4');

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        });

        console.log('5');
      
        return res.json(appointment);

        console.log('6');
      
    }
}

export default new AppointmentController();