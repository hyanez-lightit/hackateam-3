import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from 'express';
import { StatusCodes } from '../types';

const AuthController = Router();

AuthController.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(StatusCodes.CREATED).json({
        success: 'User registered successfully',
      });
    } catch (e) {
      next(e);
    }
  },
);

AuthController.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(StatusCodes.OK).json({
        success: 'User logged in successfully',
      });
    } catch (e) {
      next(e);
    }
  },
);

export { AuthController };
