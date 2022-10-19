import express from 'express';
import tasksControllers from '../controllers/tasks';
import taskValidation from '../validations/tasks';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .post('/', taskValidation.createValidation, tasksControllers.createNewTask);

export default router;
