import { Router } from 'express';
// const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Ola mundo doido de meu Deus!' });
});

// module.exports = routes;
export default routes;
