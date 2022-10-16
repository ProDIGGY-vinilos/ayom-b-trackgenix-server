import express from 'express';
import projects from '../controllers/projects';
import projectsValidation from '../validations/projects';

const router = express.Router();

router
  .get('/getById/:id', projects.getProjectById)
  .put('/update/:id', projectsValidation.validateCreation, projects.updateProject)
  .delete('/delete/:id', projects.deleteProject);

export default router;
