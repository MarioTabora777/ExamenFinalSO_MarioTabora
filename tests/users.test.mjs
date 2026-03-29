import { jest } from '@jest/globals';

const mockPool = { query: jest.fn() };
jest.unstable_mockModule('../config/db.js', () => ({ default: mockPool }));

const { default: app } = await import('../app.js');
const { default: request } = await import('supertest');

describe('GET /', () => {
  test('debe retornar API funcionando', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('API funcionando');
  });
});

describe('GET /users', () => {
  test('debe retornar lista de usuarios', async () => {
    mockPool.query.mockResolvedValue({
      rows: [{ id: 1, name: 'Mario', email: 'mario@test.com' }]
    });
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test('debe retornar 500 si hay error de BD', async () => {
    mockPool.query.mockRejectedValue(new Error('DB error'));
    const res = await request(app).get('/users');
    expect(res.status).toBe(500);
  });
});

describe('POST /users', () => {
  test('debe crear un usuario', async () => {
    mockPool.query.mockResolvedValue({
      rows: [{ id: 1, name: 'Nuevo', email: 'nuevo@test.com' }]
    });
    const res = await request(app)
      .post('/users')
      .send({ name: 'Nuevo', email: 'nuevo@test.com' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Nuevo');
  });

  test('debe retornar 500 si falla', async () => {
    mockPool.query.mockRejectedValue(new Error('DB error'));
    const res = await request(app)
      .post('/users')
      .send({ name: 'Fail', email: 'fail@test.com' });
    expect(res.status).toBe(500);
  });
});

describe('PUT /users/:id', () => {
  test('debe actualizar un usuario', async () => {
    mockPool.query.mockResolvedValue({
      rows: [{ id: 1, name: 'Editado', email: 'edit@test.com' }],
      rowCount: 1
    });
    const res = await request(app)
      .put('/users/1')
      .send({ name: 'Editado', email: 'edit@test.com' });
    expect(res.status).toBe(200);
  });

  test('debe retornar 404 si no existe', async () => {
    mockPool.query.mockResolvedValue({ rows: [], rowCount: 0 });
    const res = await request(app)
      .put('/users/999')
      .send({ name: 'No', email: 'no@test.com' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /users/:id', () => {
  test('debe eliminar un usuario', async () => {
    mockPool.query.mockResolvedValue({
      rows: [{ id: 1, name: 'Borrado', email: 'del@test.com' }],
      rowCount: 1
    });
    const res = await request(app).delete('/users/1');
    expect(res.status).toBe(200);
  });

  test('debe retornar 404 si no existe', async () => {
    mockPool.query.mockResolvedValue({ rows: [], rowCount: 0 });
    const res = await request(app).delete('/users/999');
    expect(res.status).toBe(404);
  });
});
