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
    test('Should return all tasks', async () => {
      const response = await request(app).get('/api/tasks').send();

      expect(response.body.data.length).toEqual(tasksSeed.length);
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

describe('CREATE /tasks', () => {
  const newTask = {
    description: 'BE',
  };
  const falseNewTask = {
    description: 'EE',
  };
  describe('Successful cases:', () => {
    test('Should return status code 201', async () => {
      const response = await request(app).post('/api/tasks').send(newTask);
      expect(response.status).toBe(201);
    });
    test('New task should have the same content of the request body', async () => {
      const response = await request(app).post('/api/tasks').send(newTask);

      expect(response.body.data.description).toBe(newTask.description);
    });
    test('Should return a success message', async () => {
      const response = await request(app).post('/api/tasks').send(newTask);

      expect(response.body.message).toMatch('Task successfully created!');
    });
    test('Should have Error: false', async () => {
      const response = await request(app).post('/api/tasks').send(newTask);

      expect(response.body.error).toBeFalsy();
    });
  });
  describe('Failed cases:', () => {
    test('Should return status code 404 (bad request)', async () => {
      const response = await request(app).post('/api/task').send(newTask);

      expect(response.status).toBe(404);
    });
    test('Should return status code 406 (body not send)', async () => {
      const response = await request(app).post('/api/tasks').send();

      expect(response.status).toBe(406);
    });
    test('Should return status code 406 (incorrect body)', async () => {
      const response = await request(app).post('/api/tasks').send(falseNewTask);

      expect(response.status).toBe(406);
    });
  });
});

describe('UPDATE /tasks', () => {
  const taskToUpdateId = '63534ef4fc13ae1a7100001e';
  const falseTaskToUpdateId = '63534ef4fc13ae1a7101101e';
  const updatedTask = {
    description: 'BE',
  };
  const falseUpdatedTask = {
    description: 'EE',
  };
  describe('Successful cases:', () => {
    test('Should return status code 200', async () => {
      const response = await request(app).put(`/api/tasks/${taskToUpdateId}`).send(updatedTask);

      expect(response.status).toBe(200);
    });
    test('Should return a success message', async () => {
      const response = await request(app).put(`/api/tasks/${taskToUpdateId}`).send(updatedTask);

      expect(response.body.message).toMatch('Task updated successfully');
    });
    test('Should return Error: false', async () => {
      const response = await request(app).put(`/api/tasks/${taskToUpdateId}`).send(updatedTask);

      expect(response.body.error).toBeFalsy();
    });
    test('Task edited should have the same content as request body', async () => {
      const response = await request(app).put(`/api/tasks/${taskToUpdateId}`).send(updatedTask);

      expect(response.body.data.description).toBe(updatedTask.description);
    });
    test('Task Id should not be changed', async () => {
      const response = await request(app).put(`/api/tasks/${taskToUpdateId}`).send(updatedTask);
      // eslint-disable-next-line no-underscore-dangle
      expect(response.body.data._id).toBe(taskToUpdateId);
    });
  });
  describe('Failed cases:', () => {
    test('Should return status code 404 (bad request)', async () => {
      const response = await request(app).put(`/api/task/${taskToUpdateId}`).send(updatedTask);

      expect(response.status).toBe(404);
    });
    test('Should return status code 404 (incorrect id)', async () => {
      const response = await request(app).put(`/api/task/${falseTaskToUpdateId}`).send(updatedTask);

      expect(response.status).toBe(404);
    });
    test('Should return status code 404 (incorrect body)', async () => {
      const response = await request(app).put(`/api/task/${taskToUpdateId}`).send(falseUpdatedTask);

      expect(response.status).toBe(404);
    });
  });
});
