import 'dotenv/config';
import { initServer } from './src/app';
import { consoleLoggerFormat, logger } from './src/utils';
import winston from 'winston';

logger.add(
  new winston.transports.Console({
    format: consoleLoggerFormat,
    level: 'debug',
  }),
);

(async () => {
  try {
    initServer();
  } catch (err: any) {
    logger.error(`Error initializing server: ${String(err)}`);
    process.exit(0);
  }
})();
