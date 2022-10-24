import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

describe('GET BY ID /employees/:id', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees/6352daf070bd974cac6927cc').send();
    expect(response.status).toBe(200);
  });
  test('response should return a status 404 if the id does not exist', async () => {
    const response = await request(app).get('/api/employees/628e3acafb848cdc505426a5').send();
    expect(response.status).toEqual(404);
  });
  test('response should return an specific employee', async () => {
    const response = await request(app).get('/api/employees/6352dafc15b1b196950a8583').send();
    const employee = {
      name: 'Rita',
      lastName: 'Milstein',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    };
    expect(response.body.data).toMatchObject(employee);
  });
});
