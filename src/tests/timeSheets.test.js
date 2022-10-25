import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import TimeSheets from '../models/TimeSheets';
import timeSheestsSeed from '../seeds/timeSheets';

beforeAll(async () => {
  await TimeSheets.collection.insertMany(timeSheestsSeed);
});

describe('GETBYID /api/timeSheet', () => {
  test('Response should return a json object', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(typeof response).toBe('object');
  });
  test('Status should be 200 given a valid ID', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(response.status).toBe(200);
  });
  test('Error should be false given a valid ID', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(response.error).toBeFalsy();
  });
  test('Status should be 404 given a non existent ID', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.status).toBe(404);
  });
  test('Error should be true given a non existent ID', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.error).toBeTruthy();
  });
  test('Status should be 400 given an invalid ID', async () => {
    const response = await request(app).get('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBe(400);
  });
  test('Error should be true given an invalid ID', async () => {
    const response = await request(app).get('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBeTruthy();
  });
});

const correctEdit = {
  description: 'Edited timeSheet',
  date: '5-28-2022',
  task: mongoose.Types.ObjectId('63534ef4fc13ae1a71000020'),
  employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
  project: mongoose.Types.ObjectId('635342acfc13ae517a000020'),
  hours: '45',
};

const incorrectEdit = {
  description: 'broken timesheet',
  date: '24-5-2022',
  task: 'break the edit',
  employee: 'Guido',
  project: 'break everything',
  hours: 'too much',
};

describe('EDIT /api/timeSheet', () => {
  test('Response should return a json object', async () => {
    const response = await request(app).get('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(typeof response).toBe('object');
  });
  test('Status should be 200 given a valid ID', async () => {
    const response = await request(app).put('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(response.status).toBe(200);
  });
  test('Error should be false given a valid ID', async () => {
    const response = await request(app).put('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(response.error).toBeFalsy();
  });
  test('Status should be 200 given a valid ID and a correct body to edit', async () => {
    const response = await request(app).put('/api/timeSheet/6352e89b4760bc22934f3507').send(correctEdit);
    expect(response.status).toBe(200);
  });
  test('Error should be false given a valid ID a correct body to edit', async () => {
    const response = await request(app).put('/api/timeSheet/6352e89b4760bc22934f3507').send(correctEdit);
    expect(response.error).toBeFalsy();
  });
  test('Status should be 400 given a valid ID but incorrect data to edit', async () => {
    const response = await request(app).put('/api/timeSheet/6352e89b4760bc22934f3507').send(incorrectEdit);
    expect(response.status).toBe(400);
  });
  test('Error should be true given a valid ID but incorrect data to edit', async () => {
    const response = await request(app).put('/api/timeSheet/6352e89b4760bc22934f3507').send(incorrectEdit);
    expect(response.error).toBeTruthy();
  });
  test('Status should be 404 given a non existent ID', async () => {
    const response = await request(app).put('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.status).toBe(404);
  });
  test('Error should be true given a non existent ID', async () => {
    const response = await request(app).put('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.error).toBeTruthy();
  });
  test('Status should be 400 given an invalid ID', async () => {
    const response = await request(app).put('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBe(400);
  });
  test('Error should be true given an invalid ID', async () => {
    const response = await request(app).put('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBeTruthy();
  });
});

describe('DELETE /api/timeSheet', () => {
  test('Status should be 204 given a valid ID', async () => {
    const response = await request(app).del('/api/timeSheet/6352e89b4760bc22934f3507').send();
    expect(response.status).toBe(204);
  });
  test('Error should be false given a valid ID', async () => {
    const response = await request(app).del('/api/timeSheet/6352eb462bacec0e04ed2036').send();
    expect(response.error).toBeFalsy();
  });
  test('Status should be 404 given a non existent ID', async () => {
    const response = await request(app).del('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.status).toBe(404);
  });
  test('Error should be true given a non existent ID', async () => {
    const response = await request(app).del('/api/timeSheet/6352e89b4760bc22934f1234').send();
    expect(response.error).toBeTruthy();
  });
  test('Status should be 400 given an invalid ID', async () => {
    const response = await request(app).del('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBe(400);
  });
  test('Error should be true given an invalid ID', async () => {
    const response = await request(app).del('/api/timeSheet/bfdsiohsb').send();
    expect(response.status).toBeTruthy();
  });
});
