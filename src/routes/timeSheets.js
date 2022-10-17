import express from 'express';
import timeSheetsControllers from '../controllers/timeSheets';
import timeSheetsValidations from '../validations/timeSheets';

const router = express.Router();

router
  .get('/', timeSheetsControllers.getAllTimeSheets)
  // .get('/:id', timeSheetsControllers.getTimeSheetById)
  .post('/', timeSheetsValidations.validateCreation, timeSheetsControllers.createTimeSheet);
// .delete('/:id', timeSheetsControllers.deleteTimeSheet)
// .put('/:id', timeSheetsControllers.editTimeSheet);

export default router;
