import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

describe('GET BY ID Employees Controller', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees/6352daf070bd974cac6927cc').send();
    expect(response.status).toBe(200);
  });
  test('response should return a status 404 if the id does not exist', async () => {
    const response = await request(app).get('/api/employees/628e3acafb848cdc505426a5').send();
    expect(response.status).toEqual(404);
  });
  test('response should return a status 404 if the route is not correct', async () => {
    const response = await request(app).get('/employees/628e3acafb848cdc505426a5').send();
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

describe('DELETE Employees Controller', () => {
  test('the employee was successfully deleted', async () => {
    const response = await request(app).delete('/api/employees/6352daf070bd974cac6927cc').send();
    expect(response.status).toEqual(204);
  });

  test('status 404 if the employee does not exist', async () => {
    const response = await request(app).delete('/api/employees/628e3acafb848cdc505426a55').send();
    expect(response.status).toEqual(404);
  });

  test('response should return a status 404 if the route is not correct', async () => {
    const response = await request(app).get('/employees/628e3acafb848cdc505426a5').send();
    expect(response.status).toEqual(404);
  });
});

describe('POST Employee Controller', () => {
  test('Creation of employee', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(201);
  });

  test('should return a 404 when the endpoint is wrong', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(404);
  });

  test('should not create employee if body is empty', async () => {
    const response = await request(app).post('/api/employees').send();
    expect(response.status).toBe(400);
  });

  test('name missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      lastName: 'Milstein',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(400);
  });

  test('last name missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(400);
  });

  test('email missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      phone: '7131297018',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(400);
  });

  test('phone missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(400);
  });

  test('password missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      email: 'maju_12puet@hotmail.com',
      phone: '7131297018',
    });
    expect(response.status).toBe(400);
  });

  test('if the last name is spelled wrong, it returns me an undefined data', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Mil*stein',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.body.msg).toEqual(undefined);
  });

  test('should return 404 if mail is not valid', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      phone: '7131297018',
      email: 'maju_12puet',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(400);
  });
});
