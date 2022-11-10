import express from 'express';
import tasksControllers from '../controllers/tasks';
import taskValidation from '../validations/tasks';

const router = express.Router();

router.get('/', tasksControllers.getAllTasks);
router.get('/:id', tasksControllers.getTaskById);
router.post('/', taskValidation.createValidation, tasksControllers.createNewTask);
router.put('/:id', taskValidation.createValidation, tasksControllers.updateTask);
router.delete('/:id', tasksControllers.deleteTask);

export default router;
