import express from 'express';
import tasksControllers from '../controllers/tasks';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .post('/', tasksControllers.createNewTask);

export default router;
