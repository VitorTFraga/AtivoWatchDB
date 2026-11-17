import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('API AtivoWatch', () => {
  it('GET /health deve retornar status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('GET /api/ativos deve retornar a lista de ativos com contagem de sensores', async () => {
    const res = await request(app).get('/api/ativos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('total_sensores');
  });

  it('GET /api/leituras/:id deve retornar dados agregados por minuto', async () => {
    const res = await request(app).get('/api/leituras/1?minutos=10');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('bucket');
      expect(res.body[0]).toHaveProperty('media');
    }
  });
});