import { Router } from 'express';
import { AuthController } from './controllers';

const ApiRouter = Router();

ApiRouter.use('/auth', AuthController);

export default ApiRouter;
