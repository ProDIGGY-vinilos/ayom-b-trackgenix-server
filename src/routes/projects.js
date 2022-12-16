import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), projectsControllers.getAllProjects);
router.get('/withDeleted', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), projectsControllers.getAllWithDeletedProjects);
router.get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), projectsControllers.getProjectById);
router.get('/employee/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), projectsControllers.getProjectsByEmployee);
router.post('/', checkAuth(['SUPER_ADMIN', 'ADMIN']), projectsValidations.validateCreation, projectsControllers.createProject);
router.put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), projectsValidations.validateCreation, projectsControllers.updateProject);
router.delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), projectsControllers.deleteProject);

export default router;
