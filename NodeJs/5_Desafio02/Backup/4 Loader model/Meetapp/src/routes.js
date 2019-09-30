import { Router } from 'express';
const routes = new Router();

// Rotas
routes.post('/teste', async (req, res, next) => {
  return res.json({ name: 'teste' });
});

export default routes;
