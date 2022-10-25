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
  test('response should return a 204 status when the employee was successfully deleted', async () => {
    const response = await request(app).delete('/api/employees/6352daf070bd974cac6927cc').send();
    expect(response.status).toEqual(204);
  });

  test('response should return a 404 status if the employee does not exist', async () => {
    const response = await request(app).delete('/api/employees/628e3acafb848cdc505426a55').send();
    expect(response.status).toEqual(404);
  });

  test('response should return a status 404 if the route is not correct', async () => {
    const response = await request(app).get('/employees/628e3acafb848cdc505426a5').send();
    expect(response.status).toEqual(404);
  });
});

describe('POST Employee Controller', () => {
  test('response should return a 201 status when the employee was successfully created', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(201);
  });

  test('response should return a 404 status when the route is wrong', async () => {
    const response = await request(app).post('/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(404);
  });

  test('response should return a 400 status if body is empty', async () => {
    const response = await request(app).post('/api/employees').send();
    expect(response.status).toBe(400);
  });

  test('response should return a 400 status when name missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      lastName: 'Milstein',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(400);
  });

  test('response should return a 400 status when last name missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(400);
  });

  test('response should return a 400 status when email missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      phone: '7131297018',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(400);
  });

  test('response should return a 400 status when phone missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.status).toBe(400);
  });

  test('response should return a 400 status when password missing, should not create a employee', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Milstein',
      email: 'maju_12puet@hotmail.com',
      phone: '7131297018',
    });
    expect(response.status).toBe(400);
  });

  test('response should me an undefined data if the last name is spelled wrong', async () => {
    const response = await request(app).post('/api/employees').send({
      name: 'Rita',
      lastName: 'Mil*stein',
      phone: '7131297018',
      email: 'maju_12puet@hotmail.com',
      password: '10we43qovls823mf7',
    });
    expect(response.body.msg).toEqual(undefined);
  });

  test('response should return 404 status if email is not valid', async () => {
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
