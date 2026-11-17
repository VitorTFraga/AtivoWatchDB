import { Router } from 'express';
import { pool } from './db.js';

export const router = Router();

router.get('/ativos', async (_req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT a.id, a.name, a.type, COUNT(s.id)::int AS total_sensores
      FROM assets a 
      LEFT JOIN sensors s ON s.asset_id = a.id
      GROUP BY a.id 
      ORDER BY a.name
    `);
    res.json(rows);
  } catch (e) { next(e); }
});

router.get('/leituras/:sensorId', async (req, res, next) => {
  try {
    const minutos = Math.min(Number(req.query.minutos || 60), 1440);
    const { rows } = await pool.query(`
      SELECT time_bucket('1 minute', ts) AS bucket,
             AVG(value)::float AS media, 
             MIN(value)::float AS minimo, 
             MAX(value)::float AS maximo
      FROM readings
      WHERE sensor_id = $1 AND ts > now() - ($2 || ' minutes')::interval
      GROUP BY bucket 
      ORDER BY bucket
    `, [req.params.sensorId, minutos]);
    res.json(rows);
  } catch (e) { next(e); }
});

router.get('/stream', async (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  const client = await pool.connect();
  await client.query('LISTEN leituras_novas');
  
  const onNotify = (msg) => res.write(`data: ${msg.payload}\n\n`);
  client.on('notification', onNotify);

  const heartbeat = setInterval(() => res.write(': ping\n\n'), 15000);
  
  req.on('close', () => {
    clearInterval(heartbeat);
    client.removeListener('notification', onNotify);
    client.release();
  });
});