import express from 'express';
import timeSheetsControllers from '../controllers/timeSheets';
import timeSheetsValidations from '../validations/timeSheets';

const router = express.Router();

router.get('/:id', timeSheetsControllers.getTimeSheetById);
router.delete('/:id', timeSheetsControllers.deleteTimeSheet);
router.put('/:id', timeSheetsValidations.validateCreation, timeSheetsControllers.editTimeSheet);
router.get('/', timeSheetsControllers.getAllTimeSheets);
router.post('/', timeSheetsValidations.validateCreation, timeSheetsControllers.createTimeSheet);

export default router;
