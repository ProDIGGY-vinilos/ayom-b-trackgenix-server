import express from 'express';
import tasksControllers from '../controllers/tasks';
import taskValidation from '../validations/tasks';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), tasksControllers.getAllTasks);
router.get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), tasksControllers.getTaskById);
router.post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), taskValidation.createValidation, tasksControllers.createNewTask);
router.put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), taskValidation.createValidation, tasksControllers.updateTask);
router.delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), tasksControllers.deleteTask);

export default router;
