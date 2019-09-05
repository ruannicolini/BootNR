import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Ruan Nicolini',
    email: 'ruannicolini@hotmail.com',
    password_hash: '123456'
  });
  // return res.json({ message: 'Ola mundo doido de meu Deus!' });
  return res.json(user);
});

// module.exports = routes;
export default routes;
