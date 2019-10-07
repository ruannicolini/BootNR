import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
const routes = new Router();

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Rotas
routes.post('/teste', async (req, res, next) => {
  return res.json({ name: 'teste' });
});

routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);

routes.put('/users', authMiddleware, UserController.update);

export default routes;
