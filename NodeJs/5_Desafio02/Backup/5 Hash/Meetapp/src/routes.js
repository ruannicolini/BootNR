import { Router } from 'express';
const routes = new Router();

import UserController from './app/controllers/UserController';

// Rotas
routes.post('/teste', async (req, res, next) => {
  return res.json({ name: 'teste' });
});

routes.post('/users', UserController.store);

export default routes;
