
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

    async update(req, res) {

        // localiza registro
        const meetup = await Meetup.findByPk(req.params.id);
        if(!meetup){
            return res.status(400).json({ error: 'Meetup Not localized' });    
        }

        //verifica se usuario que esta alterando, criou o registro
        if( meetup.user_id !== req.userId){
            return res.status(400).json({ error: 'Update not authorized' });    
        }

        // valida nova data
        if(isBefore(parseISO(meetup.date), new Date())){
            return res.status(400).json({error:'Meetup date invalid'});
        }

        // valida alterações
        const schema = Yup.object().shape({
            title: Yup.string(),
            file_id: Yup.number(),
            user_id: Yup.number(),
            description: Yup.string(),
            location: Yup.string(),
            date: Yup.date()
        });
        
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        
        // valida nova data
        if(isBefore(parseISO(req.body.date), new Date())){
            return res.status(400).json({error:'Meetup date invalid'});
        }

        // valida FK
        const fileMeetup = await File.findByPk(req.body.file_id);
        if(!fileMeetup){
            return res.status(400).json({error:'Invalid File'});    
        }

        const userMeetup = await User.findByPk(req.body.user_id);
        if(!userMeetup){
            return res.status(400).json({error:'Invalid User'});    
        }

        // altera registro
        await meetup.update(req.body);

        return res.json(meetup);

    }

    async delete(req,res){

        const meetup = await Meetup.findByPk(req.params.id);
        if(!meetup){
            return res.status(400).json({ error: 'Meetup Not localized' });    
        }

        if( meetup.user_id !== req.userId){
            return res.status(400).json({ error: 'Delete not authorized (USER)'});    
        }

        if(isBefore(parseISO(meetup.date), new Date())){
            return res.status(400).json({error:'Delete not authorized (DATE)'});
        }

        // delete meetup
        await meetup.destroy();
    
        return res.send();
        
    }
}

export default new MeetupController();