import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import TimeSheet from '../models/TimeSheets';
import timeSheetSeed from '../seeds/timeSheets';

const incorrectTimeSheet = {
  description: 'Some text inside to describe what i have to do next 2 hours',
  project: mongoose.Types.ObjectId('635342acfc13ae517a00001e'),
  task: mongoose.Types.ObjectId('63534ef4fc13ae1a7100001e'),
  employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
  hours: 2,
};

const correctTimeSheet = {
  description: 'Some text inside to describe what i have to do next 2 hours',
  date: '11-23-2022',
  project: mongoose.Types.ObjectId('635342acfc13ae517a00001e'),
  task: mongoose.Types.ObjectId('63534ef4fc13ae1a7100001e'),
  employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
  hours: 2,
};

beforeAll(async () => {
  await TimeSheet.collection.insertMany(timeSheetSeed);
});

describe('Success GET /timeSheet test', () => {
  test('GET should return any response in json format.', async () => {
    const response = await request(app).get('/api/timeSheet').send();
    expect(typeof response).toBe('object');
  });
  test('GET should return a success status code.', async () => {
    const response = await request(app).get('/api/timeSheet').send();
    expect(response.status).toBeLessThan(400);
  });
  test('GET should return at least one timesheet.', async () => {
    const response = await request(app).get('/api/timeSheet').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('GET should return all timeSheets even if data is sent in the body', async () => {
    const response = await request(app).get('/api/timeSheet').send(incorrectTimeSheet);
    expect(response.body.data.length).toBe(timeSheetSeed.length);
  });
  test('GET should return all timeSheets even if data is sent in the body', async () => {
    const response = await request(app).get('/api/timeSheet').send(correctTimeSheet);
    expect(response.body.data.length).toBe(timeSheetSeed.length);
  });
});

describe('Success POST /timeSheet test', () => {
  test('POST new timeSheet should return status code 400 if nothing sent as body', async () => {
    const response = await request(app).post('/api/timeSheet').send();
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test('POST should return any response in json format.', async () => {
    const response = await request(app).post('/api/timeSheet').send(correctTimeSheet);
    expect(typeof response).toBe('object');
  });
  test('POST should return status code 201 if sent correct timesheet as body.', async () => {
    const response = await request(app).post('/api/timeSheet').send(correctTimeSheet);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('TimeSheet created successfully');
  });
});
