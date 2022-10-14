const express = require('express');
const fs = require('fs');
const tasks = require('../data/tasks.json');

const router = express.Router();

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
      res.send(`Task created successfully: ${req.body.description}`);
    }
  });
});

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
