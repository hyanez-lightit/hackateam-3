import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from 'express';
import { StatusCodes, patientIdParamSchema } from '../types';
import { DiagnosisLogic } from '../logic/diagnosis.logic';

const DiagnosisController = Router();

// Api/diagnosis?patientId=1
DiagnosisController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { patientId } = patientIdParamSchema.parse(req.query);
      const data = await DiagnosisLogic.diagnose(patientId);
      res.status(StatusCodes.OK).json({
        success: 'Diagnosis succeeded',
        data,
      });
    } catch (e) {
      next(e);
    }
  },
);

export { DiagnosisController };
