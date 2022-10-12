const express = require('express');

const fs = require('fs');

const router = express.Router();

const timeSheetList = require('../data/time-sheets.json');

const findOnReq = (request) => {
  // eslint-disable-next-line no-prototype-builtins
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
      .send('This data does not match with any time sheet! Please check data entry');
  } else {
    res.json(timeSheetFound);
  }
});

// Delete Time Sheet
router.delete('/delete', (req, res) => {
  const timeSheetFound = findOnReq(req);
  if (timeSheetFound.length === 0) {
    res.send('Time sheet was not found. Check data sent');
  } else {
    const newTimeSheetList = timeSheetList
      .filter((timeSheet) => timeSheet.id !== timeSheetFound[0].id);
    fs.writeFile('src/data/time-sheets.json', JSON.stringify(newTimeSheetList), (err) => {
      if (err) {
        res.status(400)
          .send(`Timesheet '${timeSheetFound[0].task}', could not be deleted!`);
      } else {
        res.send(`Timesheet: '${timeSheetFound[0].task}', was successfully removed!`)
          .json(newTimeSheetList);
      }
    });
  }
});

module.exports = router;
