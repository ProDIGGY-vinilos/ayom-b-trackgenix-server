import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
});

describe('GETBYID /api/tasks', () => {
  test('Existent ID response have to be 200', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a7100001e').send();
    expect(response.status).toBe(200);
  });
  test('Existent ID error have to be false', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a7100001e').send();
    expect(response.body.error).toBeFalsy();
  });
  test('Existent ID body data have to be defined', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a7100001e').send();
    expect(response.body.data).toBeDefined();
  });
  test('Existent ID Is a json object?', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a7100001e').send();
    expect(typeof response).toBe('object');
  });
  test('Non existent ID response have to be 404', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a71000047').send();
    expect(response.status).toBe(404);
  });
  test('Non existent ID error have to be true', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a71000047').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non existent ID response body data have to be Undefined', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a71000047').send();
    expect(response.body.data).toBeUndefined();
  });
  test('Non valid id format response have to be 400', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a71000').send();
    expect(response.status).toBe(400);
  });
  test('Non valid id format error have to be true', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a71000').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non valid id format response body data have to be undefined', async () => {
    const response = await request(app).get('/api/tasks/63534ef4fc13ae1a71000').send();
    expect(response.body.data).toBeUndefined();
  });
});

describe('DELETE /api/tasks', () => {
  test('Existent ID', async () => {
    const response = await request(app).get('/api/tasks').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
  });
  /* test('Non existent Tasks', async () => {
    const response = await request(app).get('/api/task').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  }) */
});
