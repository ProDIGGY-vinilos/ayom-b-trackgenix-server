import request from 'supertest';
import app from '../app';
import superAdmins from '../models/SuperAdmins';
import superAdminsSeed from '../seeds/superAdmins';

beforeAll(async () => {
  await superAdmins.collection.insertMany(superAdminsSeed);
});

describe('GETBYID /api/superAdmins', () => {
  test('Existent ID response have to be 200', async () => {
    const response = await request(app).get('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.status).toBe(200);
  });
  test('Existent ID error have to be false', async () => {
    const response = await request(app).get('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.body.error).toBeFalsy();
  });
  test('Existent ID body data have to be defined, body defined', async () => {
    const response = await request(app).get('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.body.data).toBeDefined();
    expect(response.body).toBeDefined();
  });
  test('Existent ID Is a json object?', async () => {
    const response = await request(app).get('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(typeof response).toBe('object');
  });
  test('Non existent ID response have to be 404', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.status).toBe(404);
  });
  test('Non existent ID error have to be true', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non existent ID response body data have to be Undefined, body defined', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.body.data).toBeUndefined();
    expect(response.body).toBeDefined();
  });
  test('Non valid id format response have to be 400', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.status).toBe(400);
  });
  test('Non valid id format error have to be true', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non valid id format response body data have to be undefined, body defined', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.body.data).toBeUndefined();
    expect(response.body).toBeDefined();
  });
});

describe('DELETE-BY-ID /api/superAdmins', () => {
  test('Existent ID response have to be 204', async () => {
    const response = await request(app).del('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.status).toBe(204);
  });
  test('Existent ID body match object {}', async () => {
    const response = await request(app).del('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.body).toMatchObject({});
  });
  test('Non existent ID response have to be 404', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.status).toBe(404);
  });
  test('Non existent ID error have to be true', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non existent ID response body data have to be Undefined, body defined', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.body.data).toBeUndefined();
    expect(response.body).toBeDefined();
  });
  test('Non valid id format response have to be 400', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.status).toBe(400);
  });
  test('Non valid id format error have to be true', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non valid id format response body data have to be undefined, body defined', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.body.data).toBeUndefined();
    expect(response.body).toBeDefined();
  });
});
