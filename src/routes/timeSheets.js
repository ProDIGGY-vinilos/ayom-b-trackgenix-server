import express from 'express';
import timeSheetsControllers from '../controllers/timeSheets';
import timeSheetsValidations from '../validations/timeSheets';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), timeSheetsControllers.getAllTimeSheets);
router.get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), timeSheetsControllers.getTimeSheetById);
router.get('/employee/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), timeSheetsControllers.getTimesheetsByEmployee);
router.post('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), timeSheetsValidations.validateCreation, timeSheetsControllers.createTimeSheet);
router.put('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), timeSheetsValidations.validateCreation, timeSheetsControllers.editTimeSheet);
router.delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN']), timeSheetsControllers.deleteTimeSheet);

export default router;
