import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from 'express';
import { StatusCodes, patientIdParamSchema } from '../types';
import { PatientsLogic } from '../logic/patients.logic';

const PatientsController = Router();

// Api/patients
PatientsController.get(
  '/',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await PatientsLogic.getAll();
      console.log({ data });
      res.status(StatusCodes.OK).json({
        success: 'Patients fetched',
        data,
      });
    } catch (e) {
      next(e);
    }
  },
);

// Api/patients/1
PatientsController.get(
  '/:patientId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { patientId } = patientIdParamSchema.parse(req.params);
      const data = await PatientsLogic.get(patientId);
      res.status(StatusCodes.OK).json({
        success: 'Patient fetched',
        data,
      });
    } catch (e) {
      next(e);
    }
  },
);

export { PatientsController };
