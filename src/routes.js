import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middlewares global - autentica o usuário e segue
routes.use(authMiddleware);

// bloquear essa rota quando o usuário não esteja autenticado
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
