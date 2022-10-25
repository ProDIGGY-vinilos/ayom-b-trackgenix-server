import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import TimeSheet from '../models/TimeSheets';
import timeSheetSeed from '../seeds/timeSheets';

const incorrectTimeSheets = [
  {
    description: 'Missing "date" property, witch is required, to be correct.',
    project: mongoose.Types.ObjectId('635342acfc13ae517a00001e'),
    task: mongoose.Types.ObjectId('63534ef4fc13ae1a7100001e'),
    employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
    hours: 2,
  },
  {
    description: 'Missing "project" property, witch is required, to be correct.',
    date: '11-23-1992',
    task: mongoose.Types.ObjectId('63534ef4fc13ae1a7100001e'),
    employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
    hours: 3,
  },
  {
    description: 'Missing "task" property, witch is required, to be correct.',
    project: mongoose.Types.ObjectId('635342acfc13ae517a00001e'),
    date: '9-17-1987',
    employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
    hours: 1,
  },
  {
    description: 'Missing "employee" property, witch is required, to be correct.',
    project: mongoose.Types.ObjectId('635342acfc13ae517a00001e'),
    date: '12-25-0000',
    task: mongoose.Types.ObjectId('63534ef4fc13ae1a7100001e'),
    hours: 19999,
  },
  {
    description: 'Missing "hours" property, witch is required, to be correct.',
    project: mongoose.Types.ObjectId('635342acfc13ae517a00001e'),
    date: '12-25-0000',
    task: mongoose.Types.ObjectId('63534ef4fc13ae1a7100001e'),
    employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
  },
];

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
  test('GET should return any response in json format.', async () => {
    const response = await request(app).get('/api/timeSheet/').send();
    expect(typeof response).toBe('object');
  });
  test('GET should return a success status code.', async () => {
    const response = await request(app).get('/api/timeSheet/').send();
    expect(response.status).toBeLessThan(400);
  });
  test('GET should return at least one timesheet.', async () => {
    const response = await request(app).get('/api/timeSheet').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('GET should return all timeSheets even if data is sent in the body', async () => {
    const response = await request(app).get('/api/timeSheet').send(incorrectTimeSheets[0]);
    expect(response.body.data.length).toBe(timeSheetSeed.length);
  });
  test('GET should return all timeSheets even if data is sent in the body', async () => {
    const response = await request(app).get('/api/timeSheet').send(correctTimeSheet);
    expect(response.body.data.length).toBe(timeSheetSeed.length);
  });
});
describe('Failed GET /timeSheet test', () => {
  test('GET should return a fail status code if sent a bad path as URL.', async () => {
    const response = await request(app).get('/api/notTimeSheetPath').send();
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test('GET should return a fail status code if sent a bad path as URL.', async () => {
    const response = await request(app).get('/api/notTimeSheetPath/').send();
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});

describe('Success POST /timeSheet test', () => {
  test('POST should return any response in json format.', async () => {
    const response = await request(app).post('/api/timeSheet').send(correctTimeSheet);
    expect(typeof response).toBe('object');
  });
  test('POST should return status code 201 if sent correct timesheet as body param.', async () => {
    const response = await request(app).post('/api/timeSheet').send(correctTimeSheet);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('TimeSheet created successfully');
  });
});

describe('Failed POST /timeSheet test', () => {
  test('POST new timeSheet should return status code greater than 400 if nothing sent as body param', async () => {
    const response = await request(app).post('/api/timeSheet').send();
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test('POST should return status code greater than or 400 if sent incorrect timesheet as body param.', async () => {
    const response = await request(app).post('/api/timeSheet').send(incorrectTimeSheets[0]);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test('POST should return status code greater than or 400 if sent incorrect timesheet as body param.', async () => {
    const response = await request(app).post('/api/timeSheet').send(incorrectTimeSheets[1]);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test('POST should return status code greater than or 400 if sent incorrect timesheet as body param.', async () => {
    const response = await request(app).post('/api/timeSheet').send(incorrectTimeSheets[2]);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test('POST should return status code greater than or 400 if sent incorrect timesheet as body param.', async () => {
    const response = await request(app).post('/api/timeSheet').send(incorrectTimeSheets[3]);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test('POST should return status code greater than or 400 if sent incorrect timesheet as body param.', async () => {
    const response = await request(app).post('/api/timeSheet').send(incorrectTimeSheets[4]);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
  test('POST should return status code greater than or 400 if sent an empty object as body param.', async () => {
    const response = await request(app).post('/api/timeSheet').send({});
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});
