
import * as Yup from 'yup';
import { parseISO, isBefore } from 'date-fns';
import File from '../models/File';
import User from '../models/User';
import Meetup from '../models/Meetup';

class MeetupController {

    async store(req, res){

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            file_id: Yup.number().required(),
            user_id: Yup.number().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        if(isBefore(parseISO(req.body.date), new Date())){
            return res.status(400).json({error:'Meetup date invalid'});
        }

        const fileMeetup = await File.findByPk(req.body.file_id);
        if(!fileMeetup){
            return res.status(400).json({error:'Invalid File'});    
        }

        const userMeetup = await User.findByPk(req.body.user_id);
        if(!userMeetup){
            return res.status(400).json({error:'Invalid User'});    
        }

        const meetup = await Meetup.create(req.body);

        return res.json(meetup);

    }

    async update(req,res){

    }

    async delete(req,res){

    }
}

export default new MeetupController();