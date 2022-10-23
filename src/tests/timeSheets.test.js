import request from 'supertest';
import app from '../app';
import TimeSheet from '../models/TimeSheets';
import timeSheetSeed from '../seeds/timeSheets';

beforeAll(async () => {
  await TimeSheet.collection.insertMany(timeSheetSeed);
});

describe('GET /timeSheet', () => {
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
});
