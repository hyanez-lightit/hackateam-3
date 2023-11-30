import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from 'express';
import { StatusCodes } from '../types';
import { PatientsLogic } from '../logic/patients.logic';
import { userIdParamSchema } from '../types/params/userId.type';

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
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = userIdParamSchema.parse(req.params);
      const data = await PatientsLogic.get(id);
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
