import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router
  .get('/:id', projectsControllers.getProjectById)
  .put('/:id', projectsValidations.validateCreation, projectsControllers.updateProject)
  .delete('/:id', projectsControllers.deleteProject)
  .post('/', projectsValidations.validateCreation, projectsControllers.createProject)
  .get('/', projectsControllers.getAllProjects);

export default router;
