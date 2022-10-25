import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Project from '../models/Projects';
import projectSeed from '../seeds/projects';

beforeAll(async () => {
  await Project.collection.insertMany(projectSeed);
});

let projectId;

const mockedProject = {
  name: 'Stronghold',
  description: 'Other superficial bite of breast, left breast',
  startDate: '2022-01-04T03:00:00.000Z',
  endDate: '2022-09-12T03:00:00.000Z',
  clientName: 'Schumm LLC',
  employees: [
    {
      employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
      role: 'DEV',
      rate: '150',
    },
    {
      employee: mongoose.Types.ObjectId('6352dbec0259a3a36db761d3'),
      role: 'QA',
      rate: '250',
    },
  ],
};

describe('CREATE project', () => {
  describe('Sucess cases', () => {
    test('Returns status code 201 without errors', async () => {
      const response = await request(app).post('/api/projects').send(mockedProject);

      expect(response.status).toBe(201);
      await Project.deleteMany();
      await Project.collection.insertMany(projectSeed);
    });
    test('Returns success message', async () => {
      const response = await request(app).post('/api/projects').send(mockedProject);

      expect(response.body.message).toBe('The project was created.');
      await Project.deleteMany();
      await Project.collection.insertMany(projectSeed);
    });
    test('Returns created project', async () => {
      const response = await request(app).post('/api/projects').send(mockedProject);
      // eslint-disable-next-line no-underscore-dangle
      projectId = response.body.data._id;
      const dataGen = response.body.data;
      let i = 0;
      Object.keys(dataGen).forEach((property) => {
        if (property !== '_id' && property !== '__v') {
          if (property === 'employees') {
            const dataEmployee = dataGen.employees;
            for (let j = 0; j < dataEmployee.length; j += 1) {
              expect(dataEmployee[j].role).toBe(mockedProject.employees[j].role);
              expect(dataEmployee[j].rate)
                .toBe(parseInt(mockedProject.employees[j].rate, 10));
            }
          } else {
            expect(property).toEqual(Object.keys(mockedProject)[i]);
            expect(response.body.data[property]).toEqual(mockedProject[property]);
          }
          i += 1;
        }
      });
    });
  });
});

describe('UPDATE /api/projects', () => {
  describe('Success cases', () => {
    test('should return status code 200', async () => {
      const mockedProjectUpdated = mockedProject;
      mockedProjectUpdated.name = 'Emanuel';
      const response = await request(app).put(`/api/projects/${projectId}`).send(mockedProjectUpdated);
      expect(response.status).toBe(200);
    });
    test('should return project', async () => {
      const mockedProjectUpdated = mockedProject;
      mockedProjectUpdated.name = 'Emanuel';
      const response = await request(app).put(`/api/projects/${projectId}`).send(mockedProjectUpdated);
      expect(response.body.data).not.toBe(undefined);
    });
  });
  describe('failure cases', () => {
    test('should return status code 404', async () => {
      const mockedProjectUpdated = mockedProject;
      const response = await request(app).put(`/api/projects/${mongoose.Types.ObjectId(0)}`).send(mockedProjectUpdated);
      expect(response.status).toBe(404);
    });
    test('should return undefined data', async () => {
      const mockedProjectUpdated = mockedProject;
      mockedProjectUpdated.name = 'Emanuel';
      const response = await request(app).put(`/api/projects/${mongoose.Types.ObjectId(0)}`).send(mockedProjectUpdated);
      expect(response.body.data).toBe(undefined);
    });
  });
});

describe('DELETE /api/projects', () => {
  describe('Success cases', () => {
    test('should return status code 200', async () => {
      const response = await request(app).delete(`/api/projects/${projectId}`).send();
      expect(response.status).toBe(200);
    });
    test('should return undefined data', async () => {
      const response = await request(app).delete(`/api/projects/${projectId}`).send();
      expect(response.body.data).toBe(undefined);
    });
  });
  describe('failure cases', () => {
    test('should return status code 404', async () => {
      const response = await request(app).delete(`/api/projects/${mongoose.Types.ObjectId(0)}`).send();
      expect(response.status).toBe(404);
    });
    test('should return undefined data', async () => {
      const response = await request(app).delete(`/api/projects/${mongoose.Types.ObjectId(0)}`).send();
      expect(response.body.data).toBe(undefined);
    });
  });
});
