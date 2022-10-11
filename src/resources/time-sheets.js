/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
/* eslint-disable import/no-import-module-exports */
import express from 'express';

import fs from 'fs';

const router = express.Router();

const timeSheetList = require('../data/time-sheets.json');

const findOnReq = (request) => {
  const checkBody = (property) => request.body.hasOwnProperty(property);
  const TimeSheetFound = timeSheetList
    .filter((timeSheet) => {
      let counter = false;
      if (checkBody('id') && timeSheet.id === Number(request.body.id)) {
        counter = true;
      }
      if (checkBody('task') && timeSheet.task === String(request.body.task)) {
        counter = true;
      }
      if (checkBody('date') && timeSheet.date === String(request.body.date)) {
        counter = true;
      }
      if (counter) {
        return timeSheet.id || timeSheet.task || timeSheet.date;
      }
      return null;
    });
  return TimeSheetFound;
};

// Get with filters
router.get('/getByArgument', (req, res) => {
  const timeSheetFound = findOnReq(req);
  if (timeSheetFound.length === 0) {
    res.status(400)
      .send('This data dosen\'t match with any time sheet! Please check data entry');
  } else {
    res.json(timeSheetFound);
  }
});

// Delete Time Sheet
router.delete('/delete', (req, res) => {
  const timeSheetFound = findOnReq(req);
  if (timeSheetFound.length === 0) {
    res.send('None changes done');
  } else {
    const newTimeSheetList = timeSheetList
      .filter((timeSheet) => timeSheet.id !== timeSheetFound[0].id);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(newTimeSheetList), (err) => {
      if (err) {
        res.status(400)
          .send('Could not edit the file!');
      } else {
        res.json(newTimeSheetList);
      }
    });
  }
});

module.exports = router;
