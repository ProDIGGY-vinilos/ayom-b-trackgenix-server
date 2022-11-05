import request from 'supertest';
import app from '../app';
import superAdmins from '../models/SuperAdmins';
import superAdminsSeed from '../seeds/superAdmins';

beforeAll(async () => {
  await superAdmins.collection.insertMany(superAdminsSeed);
});

const superAdminValid = {
  name: 'Verona',
  lastName: 'Baudracco',
  email: 'ReDesaparecidaLaVero@gmail.com',
  password: 'NoEsVeronicaEsVERONA01',
};

const superAdminInvalid = {
  name: {
    name: 'Vero NaShe',
    lastName: 'Baudracco',
    email: 'ReDesaparecidaLaVero@gmail.com',
    password: 'NoEsVeronicaEsVERONA',
  },
  lastName: {
    name: 'Verona',
    lastName: 'Baudraggooooooool!!!!',
    email: 'ReDesaparecidaLaVero@gmail.com',
    password: 'NoEsVeronicaEsVERONA',
  },
  email: {
    name: 'Verona',
    lastName: 'Baudracco',
    email: 'aparece Vero!!!@gmail.com',
    password: 'NoEsVeronicaEsVERONA',
  },
  password: {
    name: 'Verona',
    lastName: 'Baudracco',
    email: 'ReDesaparecidaLaVero@gmail.com',
    password: 'LaVerónica//(//',
  },
  missingProp: {
    name: 'Verona',
    lastName: 'Baudracco',
    email: 'ReDesaparecidaLaVero@gmail.com',
  },
};

describe('GET all /api/superAdmins', () => {
  describe('Success GET tests', () => {
    test('if send a VALID path it should return a 200 status code', async () => {
      const response = await request(app).get('/api/superAdmins').send();
      expect(response.status).toBe(200);
    });
    test('if send a VALID path it should return a message like "Super Admin found"', async () => {
      const response = await request(app).get('/api/superAdmins').send();
      expect(response.body.message).toBe('Super Admins found');
    });
    test('if send an object with invalid properties on body it should return ALL Super Admins', async () => {
      const response = await request(app).get('/api/superAdmins').send({ football: 'allways' });
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(superAdminsSeed.length);
    });
    test('if send a valid superAdmin property on query params it should return this exactly superAdmin', async () => {
      const response = await request(app).get('/api/superAdmins/?name=Verona').send();
      expect(response.body.data).toMatchObject([superAdminValid]);
    });
    test('if send a valid superAdmin property on query params it should return those two superAdmins', async () => {
      const response = await request(app).get('/api/superAdmins/?name=Verona&name=Ignacio').send();
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data).toMatchObject([{
        name: 'Ignacio',
        lastName: 'Aristo',
        email: 'NoMeDigan_Nacho@gmail.com',
        password: 'elMrSatanSinRulos01',
      },
      {
        name: 'Verona',
        lastName: 'Baudracco',
        email: 'ReDesaparecidaLaVero@gmail.com',
        password: 'NoEsVeronicaEsVERONA01',
      }]);
    });
    test('if send an invalid superAdmin property on query params it should return a valid request with all superAdmins', async () => {
      const response = await request(app).get('/api/superAdmins/?fulbo=yes').send();
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(superAdminsSeed.length);
    });
  });
  describe('Wrong GET tests', () => {
    test('if send an INVALID path it should return a 404 status code', async () => {
      const response = await request(app).get('/api/superDuperAdmins').send();
      expect(response.status).toBe(404);
    });
    test('if send an INVALID query params it should return "Admin Not Found" with 404 status code', async () => {
      const response = await request(app).get('/api/superAdmins/?name=Alberto&lastName=queMalPensado').send();
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Super Admins not found');
    });
  });
});

describe('GETBYID /api/superAdmins', () => {
  test('Existent ID response have to be 200', async () => {
    const response = await request(app).get('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.status).toBe(200);
  });
  test('Existent ID error have to be false', async () => {
    const response = await request(app).get('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.body.error).toBeFalsy();
  });
  test('Existent ID body data have to be defined, body defined', async () => {
    const response = await request(app).get('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.body.data).toBeDefined();
    expect(response.body).toBeDefined();
  });
  test('Existent ID Is a json object?', async () => {
    const response = await request(app).get('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(typeof response).toBe('object');
  });
  test('Non existent ID response have to be 404', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.status).toBe(404);
  });
  test('Non existent ID error have to be true', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non existent ID response body data have to be Undefined, body defined', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.body.data).toBeUndefined();
    expect(response.body).toBeDefined();
  });
  test('Non valid id format response have to be 500', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.status).toBe(500);
  });
  test('Non valid id format error have to be true', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non valid id format response body data have to be undefined, body defined', async () => {
    const response = await request(app).get('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.body.data).toBeUndefined();
    expect(response.body).toBeDefined();
  });
});

describe('DELETE-BY-ID /api/superAdmins', () => {
  test('Existent ID response have to be 204', async () => {
    const response = await request(app).del('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.status).toBe(204);
  });
  test('Existent ID body match object {}', async () => {
    const response = await request(app).del('/api/superAdmins/6352d3e9239ac7eb3f7d3e88').send();
    expect(response.body).toMatchObject({});
  });
  test('Non existent ID response have to be 404', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.status).toBe(404);
  });
  test('Non existent ID error have to be true', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non existent ID response body data have to be Undefined, body defined', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000047').send();
    expect(response.body.data).toBeUndefined();
    expect(response.body).toBeDefined();
  });
  test('Non valid id format response have to be 500', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.status).toBe(500);
  });
  test('Non valid id format error have to be true', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.body.error).toBeTruthy();
  });
  test('Non valid id format response body data have to be undefined, body defined', async () => {
    const response = await request(app).del('/api/superAdmins/63534ef4fc13ae1a71000').send();
    expect(response.body.data).toBeUndefined();
    expect(response.body).toBeDefined();
  });
});

describe('POST /api/superAdmins', () => {
  describe('Success POST test', () => {
    test('if send completly full body object it should return a valid response with new superAdmin', async () => {
      const response = await request(app).post('/api/superAdmins').send(superAdminValid);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Super Admin created successfully');
      expect(response.body.data).toMatchObject(superAdminValid);
    });
  });
  describe('Wrong POST test', () => {
    test('if send a missing property as body it should return status code 400', async () => {
      const response = await request(app).post('/api/superAdmins').send(superAdminInvalid.missingProp);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
    test('if send an invalid proeprty value it should return status code 400', async () => {
      const response = await request(app).post('/api/superAdmins').send(superAdminInvalid.name);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
    test('if send an invalid proeprty value it should return status code 400', async () => {
      const response = await request(app).post('/api/superAdmins').send(superAdminInvalid.lastName);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
    test('if send an invalid proeprty value it should return status code 400', async () => {
      const response = await request(app).post('/api/superAdmins').send(superAdminInvalid.email);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
    test('if send an invalid proeprty value it should return status code 400', async () => {
      const response = await request(app).post('/api/superAdmins').send(superAdminInvalid.password);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });
});

describe('PUT /api/superAdmins', () => {
  const id = '6352d7e777ae480815a63af2';
  describe('Success PUT tests', () => {
    test('if send a VALID id as params & a VALID object as body it should return a valid request', async () => {
      const response = await request(app).put(`/api/superAdmins/${id}`).send(superAdminValid);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(`Super Admin with id:${id} updated successfully`);
      expect(response.body.data).toMatchObject(superAdminValid);
    });
  });
  describe('Wrong PUT tests', () => {
    test('if send a VALID ID as params but an object with an INVALID property as body it should return a bad request', async () => {
      const response = await request(app).put(`/api/superAdmins/${id}`).send(superAdminInvalid.name);
      expect(response.status).toBe(400);
    });
    test('if send a VALID ID as params but an object with an INVALID propertyas body it should return a bad request', async () => {
      const response = await request(app).put(`/api/superAdmins/${id}`).send(superAdminInvalid.missingProp);
      expect(response.status).toBe(400);
    });
    test('if send an INVALID ID it should retunr a bad request', async () => {
      const response = await request(app).put('/api/superAdmins/48r812382472t829t2gw').send(superAdminValid);
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });
});
