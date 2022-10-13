const express = require('express');

const fs = require('fs');

const router = express.Router();

const timeSheets = require('../data/time-sheets.json');

const findOnReq = (request) => {
  // eslint-disable-next-line no-prototype-builtins
  const checkBody = (property) => request.body.hasOwnProperty(property);
  const TimeSheetFound = timeSheets
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
    const newTimeSheetList = timeSheets
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

// Add time sheet
router.post('/add', (req, res) => {
  const newTimeSheet = req.body;
  if ((JSON.stringify(newTimeSheet) !== '{}') && (Object.keys(newTimeSheet)[0] === 'id')
  && !(timeSheets.find((timeSheet) => JSON.stringify(timeSheet.id)
  === JSON.stringify(newTimeSheet.id)))) {
    if (Object.keys(newTimeSheet)[1] === 'description'
    && Object.keys(newTimeSheet)[2] === 'date' && Object.keys(newTimeSheet)[3] === 'task') {
      timeSheets.push(newTimeSheet);
      fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
        if (err) {
          res.send('Problem when adding time sheet');
        } else {
          res.json({ msg: 'time sheet created', newTimeSheet });
        }
      });
    } else {
      res.send('Missing, incorrect or unordered properties');
    }
  } else if (JSON.stringify(newTimeSheet) === '{}') {
    res.send('Cannot add empty time sheet');
  } else {
    res.send('Id cannot be repeated or id property name is incorrect');
  }
});

// Get time sheet method
router.get('/getById/:id', (req, res) => {
  const timeSheetId = req.params.id;
  const foundTimeSheet = timeSheets.find((timeSheet) => JSON.stringify(timeSheet.id)
  === timeSheetId);
  if (foundTimeSheet) {
    res.send(foundTimeSheet);
  } else {
    res.send('time sheet not found');
  }
});

// Edit time Sheet method
router.put('/update/:id', (req, res) => {
  const foundTimeSheet = timeSheets.some((timeSheet) => JSON.stringify(timeSheet.id)
    === req.params.id);
  if (foundTimeSheet) {
    const updateTimeSheet = req.body;
    timeSheets.forEach((timeSheet) => {
      if (JSON.stringify(timeSheet.id) === req.params.id) {
        timeSheet.description = updateTimeSheet.description ? updateTimeSheet.description : timeSheet.description;  // eslint-disable-line
        timeSheet.date = updateTimeSheet.date ? updateTimeSheet.date : timeSheet.date; // eslint-disable-line
        timeSheet.task = updateTimeSheet.task ? updateTimeSheet.task : timeSheet.task; // eslint-disable-line
        fs.writeFile('src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
          if (err) {
            res.send('Problem when adding time sheet');
          } else {
            res.send('time sheet created');
          }
        });
        res.json({ msg: 'time sheet updated', timeSheet });
      }
    });
  } else {
    res.send('Cant modify unexistent time sheet');
  }
});

module.exports = router;
