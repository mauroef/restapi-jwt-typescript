import express, { Application } from 'express';
import morgan from 'morgan';

const app: Application = express();

import authRoutes from './routes/auth';

// settings
app.set('port', 4000);

// middleware
app.use(morgan('dev'));

// routes
app.use(authRoutes);

export default app;
