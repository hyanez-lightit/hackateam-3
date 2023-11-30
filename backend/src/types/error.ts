import { type StatusCodes } from './statusCodes';

export type Error = {
  message: string;
  type: StatusCodes | undefined;
  stack?: any;
  sqlMessage?: any;
  name: string;
};
