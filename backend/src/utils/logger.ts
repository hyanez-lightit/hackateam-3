/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as util from 'util';
import type winston from 'winston';
import { createLogger, format } from 'winston';

const getColor = (infoLevel: string): string => {
  switch (infoLevel) {
    case 'error':
      return '\u001b[1;31m';
    case 'warn':
      return '\u001b[1;33m';
    case 'info':
      return '\u001b[1;36m';
    default:
      return '\x1b[30m';
  }
};

const getMessage = (info: any) => {
  if (info.message?.error)
    return util.format({
      data: info.message?.data as string,
      error: info.message?.error as Error,
    });

  if (info?.original) return JSON.stringify(info.original.message);
  return JSON.stringify(info.message);
};

export const consoleLoggerFormat = format.combine(
  format.timestamp({
    format: 'HH:mm:ss.SSS',
  }),
  format.printf(
    (info: any) =>
      `\x1b[7m${info.timestamp} ${getColor(
        info.level,
      )} [${info.level?.toUpperCase()}] \x1b[0m ${getMessage(info)}${
        info.splat ?? ' '
      }`,
  ),
);

export const logger: winston.Logger = createLogger();
