import express from 'express';
import projectsRouter from './projects';
import timeSheetRouter from './timeSheets';
import tasksRouter from './tasks';
import adminRouter from './admins';
import superAdminRouter from './superAdmins';
import employeeRouter from './employees';

const router = express.Router();

router.use('/admins', adminRouter);
router.use('/employees', employeeRouter);
router.use('/projects', projectsRouter);
router.use('/superAdmins', superAdminRouter);
router.use('/tasks', tasksRouter);
router.use('/timeSheet', timeSheetRouter);

export default router;
