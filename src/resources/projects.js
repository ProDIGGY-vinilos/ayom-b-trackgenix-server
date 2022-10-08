/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-import-module-exports
import express from 'express';
import fs from 'fs';

const projectsList = require('../data/projects.json');

const router = express.Router();

//! Create a new Project.
router.post('/create', (req, res, next) => {
  const projectFinalId = projectsList[projectsList.length - 1].id;
  const isValidProject = req.body.hasOwnProperty('name')
        && req.body.hasOwnProperty('description')
        && req.body.hasOwnProperty('startDate')
        && req.body.hasOwnProperty('endDate')
        && req.body.hasOwnProperty('clientName');
  const projectExist = projectsList.some((project) => project.name === String(req.body.name));
  if (isValidProject && !projectExist) {
    req.body.id = projectFinalId + 1;
    projectsList.push(req.body);
    fs.writeFile('src/data/projects.json', JSON.stringify(projectsList), (err) => {
      if (err) {
        return res.status(400)
          .send('Project invalid! Verify information sent.');
      }
      return res.json(projectsList);
    });
    res.json(projectsList);
  } else if (projectExist) {
    return res.send('You are trying to create an existing project in our database.');
  } else {
    return res.status(400)
      .send('Project invalid! Verify information sent.');
  }
  next();
});

//! Edit Project
// router.put('/edit/project', (req, res) => {
//   const projectToEdit = req.body;
// });

//! Edit Project to add employee
router.put('/edit/employee', (req, res) => {
  const employeeToAdd = req.body.employee;
  const checkBody = (property) => req.body.hasOwnProperty(property);
  const isValidProject = projectsList.filter((project) => (checkBody('id') ? project.id === Number(req.body.id)
    : checkBody('name') ? project.name === String(req.body.name)
      : checkBody('clientName') ? project.clientName === String(req.body.clientName)
        : checkBody('startDate') ? project.startDate === String(req.body.startDate)
          : checkBody('endDate') ? project.endDate === String(req.body.endDate) : false));
  if (isValidProject.length === 0 || !req.body.employee.hasOwnProperty('rol')) {
    res.json({
      msg: 'Project invalid! Verify information sent.',
    });
  } else {
    const projectToEdit = projectsList.find((project) => project.id === Number(req.body.id));
    projectToEdit.employee.push(employeeToAdd);
    fs.writeFile('src/data/projects.json', JSON.stringify(projectsList), (err) => {
      if (err) {
        res.send('Cannot edit this project');
      } else {
        res.json(projectToEdit);
      }
    });
  }
});

//! Get projects
router.get('/getAll', (req, res, next) => {
  res.json(projectsList);
  next();
});

router.get('/getByArgument', (req, res, next) => {
  const checkBody = (property) => req.body.hasOwnProperty(property);
  const filterProjects = projectsList.filter((project) => (checkBody('id') ? project.id === Number(req.body.id)
    : checkBody('name') ? project.name === String(req.body.name)
      : checkBody('clientName') ? project.clientName === String(req.body.clientName)
        : checkBody('startDate') ? project.startDate === String(req.body.startDate)
          : checkBody('endDate') ? project.endDate === String(req.body.endDate) : false));
  if (filterProjects.length === 0) {
    res.send('This data dosen\'t match with any project! Please check data entry');
  } else {
    res.json(filterProjects);
  }
  next();
});

module.exports = router;
