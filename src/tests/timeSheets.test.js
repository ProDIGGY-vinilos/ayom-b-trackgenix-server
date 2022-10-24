import request from 'supertest';
import app from '../app';
import TimeSheets from '../models/TimeSheets';
import timeSheestsSeed from '../seeds/timeSheets';

beforeAll(async () => {
  await TimeSheets.collection.insertMany(timeSheestsSeed);
});

describe('GETBYID /api/timeSheet', () => {
  test('Status of a valid ID', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(response.status).toBe(200);
  });
  test('Error of a valid ID', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(response.error).toBeFalsy();
  });
  test('Status of non existent ID', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.status).toBe(404);
  });
  test('Error of non existent ID', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.error).toBeTruthy();
  });
  test('Status of invalid ID', async () => {
    const response = await request(app).get('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBe(400);
  });
  test('Error of invalid ID', async () => {
    const response = await request(app).get('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBeTruthy();
  });
});

describe('DELETE /api/timeSheet', () => {
  test('Status of a valid ID', async () => {
    const response = await request(app).del('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(response.status).toBe(204);
  });
  test('Error of a valid ID', async () => {
    const response = await request(app).del('/api/timeSheet/6352eb462bacec0e04ed2036').send();
    expect(response.error).toBeFalsy();
  });
  test('Status of non existent ID', async () => {
    const response = await request(app).del('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.status).toBe(404);
  });
  test('Error of non existent ID', async () => {
    const response = await request(app).del('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.error).toBeTruthy();
  });
  test('Status of invalid ID', async () => {
    const response = await request(app).del('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBe(400);
  });
  test('Error of invalid ID', async () => {
    const response = await request(app).del('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBeTruthy();
  });
});
