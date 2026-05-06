import express from 'express';
import cors from 'cors';
import employeesRouter from './routes/employees';
import reportsRouter from './routes/reports';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', employeesRouter);
app.use('/api/reports', reportsRouter);

app.get('/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, () => console.log(`🚀 HR Analytics Server active on port ${PORT}`));
