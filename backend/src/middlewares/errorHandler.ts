import { type NextFunction, type Request, type Response } from 'express';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableEntityError,
} from '../exceptions';
import { StatusCodes, type Error } from '../types';
import { logger } from '../utils';
import { ZodError } from 'zod';

export const errorHandler = (
  e: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let code = 500;
  let error = e.message;
  logger.warn(e.message);

  if (e instanceof ZodError) {
    code = StatusCodes.BAD_REQUEST;
    error = 'Please check your request body. Validation failed.';
    return res.status(code).send({ error, fields: e.errors });
  }

  if (e instanceof BadRequestError) {
    code = StatusCodes.BAD_REQUEST;
  } else if (e instanceof ConflictError) {
    code = StatusCodes.CONFLICT;
  } else if (e instanceof ForbiddenError) {
    code = StatusCodes.FORBIDDEN;
  } else if (e instanceof UnauthorizedError) {
    code = StatusCodes.UNAUTHORIZED;
  } else if (e instanceof NotFoundError) {
    code = StatusCodes.NOT_FOUND;
  } else if (e instanceof UnprocessableEntityError) {
    code = StatusCodes.UNPROCESSABLE_ENTITY;
  } else {
    code = StatusCodes.SERVER_ERROR;
  }

  return res.status(code).send({ error });
};
