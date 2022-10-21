import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router.get('/:id', projectsControllers.getProjectById);
router.put('/:id', projectsValidations.validateCreation, projectsControllers.updateProject);
router.delete('/:id', projectsControllers.deleteProject);
router.post('/', projectsValidations.validateCreation, projectsControllers.createProject);
router.get('/', projectsControllers.getAllProjects);

export default router;
