import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router
  .post('/', projectsValidations.validateCreation, projectsControllers.createProject)
  .get('/', projectsControllers.getAllProjects);

export default router;
