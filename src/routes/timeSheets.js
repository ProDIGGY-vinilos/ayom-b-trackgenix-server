import express from 'express';
import timeSheetsControllers from '../controllers/timeSheets';
import timeSheetsValidations from '../validations/timeSheets';

const router = express.Router();

router.get('/', timeSheetsControllers.getAllTimeSheets);
router.get('/:id', timeSheetsControllers.getTimeSheetById);
router.post('/', timeSheetsValidations.validateCreation, timeSheetsControllers.createTimeSheet);
router.put('/:id', timeSheetsValidations.validateCreation, timeSheetsControllers.editTimeSheet);
router.delete('/:id', timeSheetsControllers.deleteTimeSheet);

export default router;
