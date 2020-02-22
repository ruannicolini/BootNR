
import * as Yup from 'yup';

class MeetupController {

    async store(req, res){

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            file_id: Yup.number().required(),
            user_id: Yup.number().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required() //.min( new Date )
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { user_id, file_id } = req.body;


        return res.json('oi');

    }

    async update(req,res){

    }

    async delete(req,res){

    }
}

export default new MeetupController();