const express = require('express');
const fs = require('fs');

const router = express.Router();
const tasks = require('../data/tasks.json');

router.get('/getById/:id', (req, res) => {
  const taskFound = tasks.find((task) => String(task.id) === req.params.id);
  if (taskFound) {
    res.status(200).json(tasks.filter((task) => String(task.id) === req.params.id));
  } else {
    res.status(400).json({ msg: `No task with the id of ${req.params.id}` });
  }
});

router.delete('/delete/:id', (req, res) => {
  const tasksId = req.params.id;
  const filterTask = tasks.filter((task) => String(task.id) !== tasksId);
  if (tasks.length === filterTask.length) {
    res.send('Could not delete because the task was not found');
  } else {
    fs.writeFile('src/data/tasks.json', JSON.stringify(filterTask), (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(filterTask);
      }
    });
  }
});
module.exports = router;
