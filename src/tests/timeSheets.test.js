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
    expect(response.status).toBe(200);
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
