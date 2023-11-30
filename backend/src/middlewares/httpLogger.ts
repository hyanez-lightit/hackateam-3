import morgan from 'morgan';
import { logger } from '../utils';

const stream = {
  write(message: string) {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

const skip = () => false;

export const httpLogger = morgan(
  ':remote-addr :method :url :status - :response-time ms',
  { stream, skip },
);
