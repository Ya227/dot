import express from 'express';
import cors from 'cors';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(cors());

app.use(logger);

app.use('/api', routes);

app.use(errorHandler);

export default app;