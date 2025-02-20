import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import app from './index.js';

// Mock logger
vi.mock('./logger', () => ({
  logger: {
    info: vi.fn(),
  },
}));

describe('Express Server', () => {
  it('should convert valid numbers', async () => {
    const response = await request(app)
      .get('/romannumeral')
      .query({ query: '18' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      input: '18',
      output: 'XVIII',
    });
  });

  it('should handle missing query parameter', async () => {
    const response = await request(app).get('/romannumeral');

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid query parameter');
  });

  it('should handle invalid number input', async () => {
    const response = await request(app)
      .get('/romannumeral')
      .query({ query: 'abc' });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid query parameter');
  });

  it('should handle numbers out of range', async () => {
    const response = await request(app)
      .get('/romannumeral')
      .query({ query: '4000' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      input: '4000',
      output: 'Invalid number',
    });
  });

  it('should handle CORS', async () => {
    const response = await request(app)
      .get('/romannumeral')
      .query({ query: '18' });

    expect(response.headers['access-control-allow-origin']).toBe('*');
  });
});

