import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
});

describe('GETALL /tasks', () => {
  const filterByDescription = {
    description: 'BE',
  };
  const falseFilterByDescription = {
    description: 'EE',
  };
  describe('Successful cases:', () => {
    test('Should return status code 200', async () => {
      const response = await request(app).get('/api/tasks').send();

      expect(response.status).toBe(200);
    });
    test('Should return a success message', async () => {
      const response = await request(app).get('/api/tasks').send();

      expect(response.body.message).toMatch('Tasks found!');
    });
    test('Should return Error: false', async () => {
      const response = await request(app).get('/api/tasks').send();

      expect(response.body.error).toBeFalsy();
    });
    test('Should return at least 1 tasks', async () => {
      const response = await request(app).get('/api/tasks').send();

      expect(response.body.data.length).toBeGreaterThan(0);
    });
    test('Retourned should have fiteled value', async () => {
      const response = await request(app).get('/api/tasks').send(filterByDescription);

      response.body.data.forEach((task) => {
        expect(task.description).toBe('BE');
      });
    });
  });
  describe('Failed cases:', () => {
    test('Should return status code 404 (bad request)', async () => {
      const response = await request(app).get('/api/task').send();

      expect(response.status).toBe(404);
    });
    test('Should retorun status code 400 (incorrect body)', async () => {
      const response = await request(app).get('/api/tasks').send(falseFilterByDescription);

      expect(response.status).toBe(400);
    });
    test('Should return Error: true', async () => {
      const response = await request(app).get('/api/tasks').send(falseFilterByDescription);

      expect(response.error).toBeTruthy();
    });
  });
});
