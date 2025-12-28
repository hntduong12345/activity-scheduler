import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorMiddleware';

import authRoutes from './routes/authRoutes';
import activityRoutes from './routes/activityRoutes';
import aiRoutes from './routes/aiRoutes';
import miscRoutes from './routes/miscRoutes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', miscRoutes);

app.use(errorHandler);

export default app;
