import express from 'express';
import projects from '../controllers/projects';
import projectsValidation from '../validations/projects';

const router = express.Router();

router
  .get('/:id', projects.getProjectById)
  .put('/:id', projectsValidation.validateCreation, projects.updateProject)
  .delete('/:id', projects.deleteProject);

export default router;
