const express = require('express');
const fs = require('fs');
const tasks = require('../data/tasks.json');

const router = express.Router();

// CREATE TASK
router.post('/add', (req, res) => {
  const newTask = req.body;
  if (Object.keys(newTask).length !== 2) {
    res.send('Please, complete all fields');
    return;
  }
  const newID = tasks[tasks.length - 1].id + 1;
  newTask.id = newID;
  tasks.push(newTask);
  fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.send('Can not save new task');
    } else {
      res.send('Task created successfully');
    }
  });
});

// EDIT TASKS
router.put('/edit/:id', (req, res) => {
  const taskId = req.params.id;
  if (Object.keys(req.body).length !== 2) {
    res.send('Please, complete all fields');
    return;
  }
  const oldTask = tasks.find(((task) => task.id === Number(taskId)));
  if (oldTask) {
    const index = tasks.indexOf(oldTask);
    tasks[index] = req.body;
    tasks[index].id = Number(taskId);
    fs.writeFile('src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send(`Can not edit task with the id ${taskId}`);
      } else {
        res.send(`Task edited successfully: ${req.body.description}`);
      }
    });
  } else {
    res.send(`Task with the id ${taskId} not found.`);
  }
});

module.exports = router;
