import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas
routes.post('/teste', async (req, res, next) => {
  return res.json({ name: 'teste' });
});

routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetups',MeetupController.store);

routes.put('/users', authMiddleware, UserController.update);

routes.put('/meetups/:id', MeetupController.update);

export default routes;
