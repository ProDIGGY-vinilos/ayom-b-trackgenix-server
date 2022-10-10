const express = require('express');
const fs = require('fs');

const router = express.Router();
const tasks = require('../data/tasks.json');

router.get('/:id', (req, res) => {
  const found = tasks.find((task) => String(task.id) === req.params.id);
  if (found) {
    res.status(200).json(tasks.filter((task) => String(task.id) === req.params.id));
  } else {
    res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
  }
});

router.delete('/:id', (req, res) => {
  const tasksId = req.params.id;
  const filterTs = tasks.filter((task) => String(task.id) !== tasksId);
  if (tasks.length === filterTs.length) {
    res.send('Could not delete because the time sheet was not found');
  } else {
    fs.writeFile('src/data/tasks.json', JSON.stringify(filterTs), (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(filterTs);
      }
    });
  }
});
module.exports = router;
