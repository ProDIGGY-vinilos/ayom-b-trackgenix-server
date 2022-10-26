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
    expect(response.body.message).toBe('Employee found');
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
  test('Should return status code 200', async () => {
    const response = await request(app).put(`/api/employees/${employeeId}`).send(mockEmployee);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe(`Employee with the ID: ${employeeId}, has been successfully edited!`);
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
