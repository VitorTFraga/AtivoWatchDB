import { pool } from './db.js';

export function startSimulator(intervalMs = 1000) {
  return setInterval(async () => {
    try {
      const { rows } = await pool.query('SELECT id FROM sensors');
      for (const s of rows) {
        const valor = (Math.random() * 100).toFixed(2);
        const { rows: ins } = await pool.query(`
          INSERT INTO readings (sensor_id, ts, value)
          VALUES ($1, now(), $2) RETURNING sensor_id, ts, value
        `, [s.id, valor]);
        
        const payload = JSON.stringify(ins[0]).replace(/'/g, "''");
        await pool.query(`NOTIFY leituras_novas, '${payload}'`);
      }
    } catch (e) { 
      console.error('Erro no simulador:', e.message); 
    }
  }, intervalMs);
}