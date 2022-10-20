import express from 'express';
import projectsRouter from './projects';

const router = express.Router();

router
  .use('/projects', projectsRouter);

export default router;
