const express = require('express');
const fs = require('fs');

const router = express.Router();
const projects = require('../data/projects.json');

router.get('/:id', (req, res) => {
  const found = projects.find((project) => String(project.id) === req.params.id);
  if (found) {
    res.status(200).json(projects.filter((project) => String(project.id) === req.params.id));
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  const filterTs = projects.filter((project) => String(project.id) !== projectId);
  if (projects.length === filterTs.length) {
    res.send('Could not delete because the time sheet was not found');
  } else {
    fs.writeFile('src/data/projects.json', JSON.stringify(filterTs), (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(filterTs);
      }
    });
  }
});

router.post('/', (req, res) => {
  const newProject = req.body;
  projects.push(newProject);
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(newProject);
    }
  });
});

module.exports = router;
