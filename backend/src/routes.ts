import { Router } from 'express';
import { AuthController, PatientsController } from './controllers';

const ApiRouter = Router();

// Api/
ApiRouter.use('/auth', AuthController);
ApiRouter.use('/patients', PatientsController);

export default ApiRouter;
