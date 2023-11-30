import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { logger } from './utils';
import { httpLogger, errorHandler } from './middlewares';
import ApiRouter from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
});

app.use(httpLogger);
app.use(limiter);
app.use('/api', ApiRouter);
app.use(errorHandler);

const port = process.env.SERVER_PORT ?? 3001;

export const initServer = () => {
  app.listen(port, () => {
    logger.info(
      `Server started on:  ${
        process.env.APP_ENV === 'local' ? `http://localhost:${port}` : port
      }`,
    );
  });
};

app.get('/', (_req, res) => {
  res.send(`Hackat3am - Backend (v1.0.0)`);
});

export default app;
