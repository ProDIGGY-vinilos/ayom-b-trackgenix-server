import request from 'supertest';
// import mongoose from 'mongoose';
import app from '../app';
import Project from '../models/Projects';
import projectSeed from '../seeds/projects';

beforeAll(async () => {
  await Project.collection.insertMany(projectSeed);
});

// const mockedProject = {
//   name: 'Stronghold',
//   description: 'Other superficial bite of breast, left breast',
//   startDate: '2022-01-04T03:00:00.000Z',
//   endDate: '2022-09-12T03:00:00.000Z',
//   clientName: 'Schumm LLC',
//   employees: [
//     {
//       employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
//       role: 'DEV',
//       rate: '150',
//     },
//     {
//       employee: mongoose.Types.ObjectId('6352dbec0259a3a36db761d3'),
//       role: 'QA',
//       rate: '250',
//     },
//   ],
// };

// let projectId;

describe('GET all projects', () => {
  describe('Success cases', () => {
    test('Return status code 200', async () => {
      const response = await request(app).get('/api/projects').send();

      expect(response.status).toBe(200);
    });
    test('Return at least 1 project', async () => {
      const response = await request(app).get('/api/projects').send();

      expect(response.body.data.length).toBeGreaterThan(0);
    });
    test('All projects properties names are correct', async () => {
      const response = await request(app).get('/api/projects').send();
      for (let i = 0; i < response.body.data.length; i += 1) {
        expect(Object.keys(response.body.data[i])).toEqual(['_id', 'name', 'description', 'startDate', 'endDate', 'clientName', 'employees']);
      }
    });
    test('Return no error', async () => {
      const response = await request(app).get('/api/projects').send();

      expect(response.error).toBeFalsy();
    });
  });
  describe('Failure cases', () => {
    test('Return status code 400', async () => {
      // console.log(Project.collection);
      await Project.deleteMany(); // Why does this work?
      // console.log(Project.collection);
      const response = await request(app).get('/api/projects').send();

      expect(response.status).toBe(400);
    });
    test('Return no projects', async () => {
      const response = await request(app).get('/api/projects').send();

      expect(response.body.data).toBe(undefined);
    });
    test('Return error message', async () => {
      const response = await request(app).get('/api/projects').send();

      expect(response.body.message).toBe('Non existent project!');
      // I have to restore the contents of the mock database
      await Project.collection.insertMany(projectSeed);
    });
    // How to trigger an error in .find() method of mongoose?
  });
});
