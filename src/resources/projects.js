const express = require('express');
const fs = require('fs');

const router = express.Router();
const projects = require('../data/projects.json');

router.get('/getById/:id', (req, res) => {
  const projectFound = projects.find((project) => String(project.id) === req.params.id);
  if (projectFound) {
    res.status(200).json(projectFound);
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

router.delete('/delete/:id', (req, res) => {
  const projectId = req.params.id;
  const projectFiltered = projects.filter((project) => String(project.id) !== projectId);
  if (projects.length === projectFiltered.length) {
    res.send('Could not delete because the project was not found');
  } else {
    fs.writeFile('src/data/projects.json', JSON.stringify(projectFiltered), (err) => {
      if (err) {
        res.status(400).send({ msg: `Could not delete project: ${err}` });
      } else {
        res.status(200).send({
          msg: 'Project deleted successfully',
          data: projectFiltered,
        });
      }
    });
  }
});

router.post('/create', (req, res) => {
  const newProject = req.body;
  projects.push(newProject);
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.status(400).send({ msg: `Could not create project: ${err}` });
    } else {
      res.status(200).send({
        msg: 'Project created successfully',
        data: newProject,
      });
    }
  });
});

module.exports = router;
