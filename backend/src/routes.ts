import { Router } from 'express';
import { AuthController, PatientsController } from './controllers';
import { DiagnosisController } from './controllers/diagnosis.controller';

const ApiRouter = Router();

// Api/
ApiRouter.use('/auth', AuthController);
ApiRouter.use('/patients', PatientsController);
ApiRouter.use('/diagnosis', DiagnosisController);   

export default ApiRouter;
