import express from 'express';
import cors from 'cors';
import { router } from './routes.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});