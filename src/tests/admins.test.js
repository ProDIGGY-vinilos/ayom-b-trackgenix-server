import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

const correctAdminMock = {
  name: 'Carlitos',
  lastName: 'elBala',
  email: 'calibala@piñonfijo.com',
  password: 'chuchugua1',
};

const incorrectAdminMock = {
  name: '1234 Number Not Allowed',
  lastName: '!"$&"$#"  !$!af123r13',
  email: '----',
  password: 'AmAzInG-password-123',
};

const callCorrectGETRequest = () => request(app)
  .get('/api/admins/63533d49fc13ae16b7000000').send();
const callIncorrectGETRequest = () => request(app)
  .get('/api/admins/6666f4ea6dbs8655a34a45f1').send();
const callCorrectPUTRequest = () => request(app)
  .put('/api/admins/63533d49fc13ae16b7000000').send(correctAdminMock);
const callIncorrectPUTRequest = () => request(app)
  .put('/api/admins/63533d49fc13ae16b7000000').send(incorrectAdminMock);

describe('GET by id:', () => {
  describe('Success GET /api/admins/:id', () => {
    test('when send a VALID id it should send a 200 status code', async () => {
      const response = await callCorrectGETRequest();
      expect(response.status).toBe(200);
    });
    test('if send a VALID id it must have a body message equal to "Admin Found with id"', async () => {
      const response = await callCorrectGETRequest();
      expect(response.body.message).toBe('Admin Found');
    });
    test('if send a VALID id it must have a body data property of "name"', async () => {
      const response = await callCorrectGETRequest();
      expect(response.body.data).toHaveProperty('name');
    });
    test('if send a VALID id it must have a body data property of "lastName"', async () => {
      const response = await callCorrectGETRequest();
      expect(response.body.data).toHaveProperty('lastName');
    });
    test('if send a VALID id it must have a body data property of "email"', async () => {
      const response = await callCorrectGETRequest();
      expect(response.body.data).toHaveProperty('email');
    });
    test('if send a VALID id it must have a body data property of "password"', async () => {
      const response = await callCorrectGETRequest();
      expect(response.body.data).toHaveProperty('password');
    });
  });
  describe('Incorrect GET /api/admins/:id', () => {
    test('when send an INVALID id it should send a 500 status code', async () => {
      const response = await callIncorrectGETRequest();
      expect(response.status).toBe(500);
    });
    test('if send an INVALID id it must to have body message property', async () => {
      const response = await callIncorrectGETRequest();
      expect(response.body).toHaveProperty('message');
    });
  });
});

describe('PUT:', () => {
  describe('Success EDIT /api/admins/:id', () => {
    test('if send a VALID id with valid data on body it should have a 201 status code', async () => {
      const response = await callCorrectPUTRequest();
      expect(response.status).toBe(201);
    });
    test('if send a VALID id it must have a "message" property on body', async () => {
      const response = await callCorrectPUTRequest();
      expect(response.body).toHaveProperty('message');
    });
    test('if send a VALID id it must have a "data" property on body', async () => {
      const response = await callCorrectPUTRequest();
      expect(response.body).toHaveProperty('data');
    });
    test('', async () => {});
  });
  describe('Incorrect EDIT /api/admins/:id', () => {
    test('if send an INVALID id it must to return a 404 status code', async () => {
      const response = await request(app).put('/api/admins/63533d49fc13ae16b7000099').send(correctAdminMock);
      expect(response.status).toBe(404);
    });
    test('if send a VALID id with an INVALID body, it must to return 406 status code', async () => {
      const response = await callIncorrectPUTRequest();
      expect(response.status).toBe(406);
    });
    test('if send a VALID id with an INVALID body, it must have a "message" property on body', async () => {
      const response = await callIncorrectPUTRequest();
      expect(response.body).toHaveProperty('message');
    });
  });
});

describe('DELETE:', () => {
  describe('Success DEL /api/admins/:id tests:', () => {
    test('if send a VALID ID it should return status code 204.', async () => {
      const response = await request(app).del('/api/admins/63533d49fc13ae16b7000000').send();
      expect(response.status).toBe(204);
    });
  });
  describe('Incorrect DEL /api/admins/:id tests:', () => {
    test('if send an INVALID ID it should return status code 500.', async () => {
      const response = await request(app).del('/api/admins/63533d49fc13ae16b7000099').send();
      expect(response.status).toBe(500);
    });
    test('if send an INVALID ID it should return error message on body.', async () => {
      const response = await request(app).del('/api/admins/63533d49fc13ae16b7000099').send();
      expect(response.body.message).toBe('Cannot delete Admin with id: 63533d49fc13ae16b7000099');
    });
    test('if send an INVALID ID it should return true error property on body.', async () => {
      const response = await request(app).del('/api/admins/63533d49fc13ae16b7000099').send();
      expect(response.body.error).toBeTruthy();
    });
  });
});

describe('Post Function', () => {
  test('Should return status code 201', async () => {
    const response = await request(app).post('/api/admins/').send(correctAdminMock);
    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Admin created successfully');
  });
  test('Should return status code 404 wrong path', async () => {
    const response = await request(app).post('/api/admin/').send(correctAdminMock);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
  test('Should return status code 400 because of an invalid body', async () => {
    const response = await request(app).post('/api/admins/').send(incorrectAdminMock);
    expect(response.status).toBe(400);
  });
});

describe('getAll function', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Admins List');
    expect(response.body.data.length).toBe(adminSeed.length);
  });
  test('Errors in the getAll', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
  });
});
