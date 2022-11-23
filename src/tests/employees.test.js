import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

const employeeId = '6352daf070bd974cac6927cc';
const mockEmployee = {
  name: 'Milthon',
  lastName: 'Sierra',
  phone: '4795878410',
  email: 'pela_king@hotmail.com',
  password: 'nu1240ff2i1r1n3r013',
};
const invalidMockEmployee = {
  name: '1234',
  lastName: '!"$& "$#',
  phone: '4795878asdasd410',
  email: '-*-@-',
  password: '3213224235$$%$"!SA#',
};

describe('getAll function', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/api/employees').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Employees list');
    expect(response.body.data.length).toBe(employeesSeed.length);
  });
  test('Errors in the getAll', async () => {
    const response = await request(app).get('/api/employee').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});

describe('Edit function', () => {
  test('Should return status code 201', async () => {
    const response = await request(app).put(`/api/employees/${employeeId}`).send(mockEmployee);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe(`Employee with id ${employeeId} updated successfully`);
  });
  test('Should return status code 404 because not found the employee', async () => {
    const response = await request(app).put(`/api/employee/${employeeId}`).send(mockEmployee);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
  test('Should return status code 406 because of an invalid body', async () => {
    const response = await request(app).put(`/api/employees/${employeeId}`).send(invalidMockEmployee);
    expect(response.status).toBe(400);
  });
});

describe('GET BY ID Employees Controller', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/api/employees/6352daf070bd974cac6927cc').send();
    expect(response.status).toBe(200);
  });
  test('response should return a status 400 if the id does not exist', async () => {
    const response = await request(app).get('/api/employees/628e3acafb848cdc505426jj').send();
    expect(response.status).toEqual(400);
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

  test('response should return a 400 status if the employee does not exist', async () => {
    const response = await request(app).delete('/api/employees/628e3acafb848cdc505426a55').send();
    expect(response.status).toEqual(400);
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

  test('response should return an undefined data if the last name is spelled wrong', async () => {
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
