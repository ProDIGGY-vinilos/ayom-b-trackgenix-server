import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router.get('/', projectsControllers.getAllProjects);
router.get('/:id', projectsControllers.getProjectById);
router.post('/', projectsValidations.validateCreation, projectsControllers.createProject);
router.put('/:id', projectsValidations.validateCreation, projectsControllers.updateProject);
router.delete('/:id', projectsControllers.deleteProject);

export default router;
