import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from "../models/User";
import Meetup from "../models/Meetup";
import Subscription from "../models/Subscription";
import Mail from "../../lib/Mail";

class SubscriptionController {
    async index(req, res) {
        const subscriptions = await Subscription.findAll({
            where: {
                user_id: req.userId,
            },
            include: [
              {
                model: Meetup,
                as: 'meetup',
                where: {
                  date: {
                    [Op.gt]: new Date(),
                  },
                },
                required: true,
              },
            ],
            order : [['meetup','date']]
        });
      
        return res.json(subscriptions);
    }

    async store(req, res) {

        const user = await User.findByPk(req.userId);

        const schema = Yup.object().shape({
            meetup_Id: Yup.number().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }

        const meetup = await Meetup.findByPk(req.body.meetup_Id, {
            include : [
                {
                    model: User,
                    as: 'user',
                    attributes : ['id','name'],
                }
            ]
        });

        if (!meetup) {
            return res.status(400).json({ error: "This meetup doesn't exists" });
        }

        if (meetup.user_id === req.userId) {
            return res.status(400).json({ error: "Can't subscribe to you own meetups" });
        }
      
        if (meetup.past) {
            return res.status(400).json({ error: "Can't subscribe to past meetups" });
        }

        const checkDate = await Subscription.findOne({
            where: {user_id: req.userId},
            include: [
              {
                model: Meetup,
                as: "meetup",
                required: true,
                where: {
                  date: meetup.date,
                },
              },
            ],
        });
      
        if (checkDate) {
            return res.status(400).json({ error: "Can't subscribe to two meetups at the same time" });
        }

        const subscription = await Subscription.create({
            user_id: user.id,
            meetup_id: meetup.id,
        });

        console.log('1');

        // Notificar com um email
        await Mail.sendMail({
            to: `${meetup.title} <${user.email}> `,
            subject: 'teste',
            text: 'Você tem um novo cancelamento',
        });

        console.log('2');

        return res.json(subscription);
    }

    async delete(req, res) {

        if (!req.params.id) {
            res.status(400).json('id subscription not found');
        }

        const subscription = await Subscription.findOne({
            where:{ user_id: req.userId, meetup_id: req.params.id }
        });

        if (!subscription){
            res.status(400).json('subscription not found');
        }

        await subscription.destroy();
    
        return res.send();
        
    }

}

export default new SubscriptionController();