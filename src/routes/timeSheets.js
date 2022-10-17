import express from 'express';
import timeSheetsControllers from '../controllers/timeSheets';
import timeSheetsValidations from '../validations/timeSheets';

const router = express.Router();

router
  .get('/:id', timeSheetsControllers.getTimeSheetById)
  .delete('/:id', timeSheetsControllers.deleteTimeSheet)
  .put('/:id', timeSheetsValidations.validateCreation, timeSheetsControllers.editTimeSheet);

export default router;
