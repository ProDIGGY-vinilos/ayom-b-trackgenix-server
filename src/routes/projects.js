import express from 'express';
import projects from '../controllers/projects';

const router = express.Router();

router
  .get('/getById/:id', projects.getProjectById)
  .put('/update/:id', projects.updateProject)
  .delete('delete/:id', projects.deleteProject);

export default router;
