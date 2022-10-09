/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable no-nested-ternary */
// eslint-disable-next-line import/no-import-module-exports
import express from 'express';
import fs from 'fs';

const projectsList = require('../data/projects.json');

const router = express.Router();

const findProjectOnReq = (request) => {
  const checkBody = (property) => request.body.hasOwnProperty(property);

  const filterProjects = projectsList.filter((project) => (checkBody('id') ? project.id === Number(request.body.id)
    : checkBody('name') ? project.name === String(request.body.name)
      : checkBody('clientName') ? project.clientName === String(request.body.clientName)
        : checkBody('startDate') ? project.startDate === String(request.body.startDate)
          : checkBody('endDate') ? project.endDate === String(request.body.endDate) : false));
  return filterProjects;
};

const findEmployeeOnProject = (project, request) => {
  const employeeMatch = (property) => request.body.employee.hasOwnProperty(property);
  const arrayOfEmployees = project.employee;
  const employeeToDelete = arrayOfEmployees.filter((emp) => (employeeMatch('id') ? emp.id === Number(request.body.employee.id)
    : employeeMatch('name') ? emp.name === String(request.body.employee.name)
      : false));
  return employeeToDelete;
};

/*
!Edit Project
? On route must have ID number after /
? On body must have Property to edit with new value.
*/
router.put('/edit/project/:id', (req, res) => {
  const projectToEdit = projectsList.find((project) => project.id === Number(req.params.id)) || [];
  if (projectToEdit.length !== 0) {
    projectToEdit.name = req.body.name ? req.body.name : projectToEdit.name;
    projectToEdit.clientName = req.body.clientName ? req.body.clientName : projectToEdit.clientName;
    projectToEdit.description = req.body.description ? req.body.description : projectToEdit.description;
    projectToEdit.startDate = req.body.startDate ? req.body.startDate : projectToEdit.startDate;
    projectToEdit.endDate = req.body.endDate ? req.body.endDate : projectToEdit.endDate;
    fs.writeFile('src/data/projects.json', JSON.stringify(projectsList), (err) => {
      if (err) {
        res.status(400)
          .send('Cannot edit this project');
      } else {
        res.send('Project successfully updated!')
          .json(projectToEdit);
      }
    });
  } else {
    res.status(404)
      .send('This is not a valid project ID');
  }
});

/*
!Edit Project to add employee
? On body must have 2 params:
? 1) "id" to find the project to edit employee list
? 2) "employee" must be an object that matches a real employee. Must have "rol" inside (DEV, QA, TL, PM)
*/
router.put('/add/employee', (req, res, next) => {
  const employeeToAdd = req.body.employee;
  const filterProjects = findProjectOnReq(req);
  if (filterProjects.length === 0 || !req.body.employee.hasOwnProperty('rol')) {
    res.status(400)
      .send('Project invalid! Verify information sent.');
  } else {
    const employeeList = filterProjects[0].employee;
    const employeeFinalId = employeeList.at(-1).id;
    employeeToAdd.id = employeeFinalId + 1;
    filterProjects[0].employee.push(employeeToAdd);
    fs.writeFile('src/data/projects.json', JSON.stringify(projectsList), (err) => {
      if (err) {
        res.status(400)
          .send('Cannot edit this project');
      } else {
        res.send('Changes Done Successfully')
          .json(filterProjects);
      }
    });
  }
  next();
});

/* Delete employee in projectsList
? On body must have 2 params:
? 1) "id" to find the project to edit employee list
? 2) Employee "name" or "id"
*/
router.put('/delete/employee', (req, res, next) => {
  const filterProjects = findProjectOnReq(req);
  const employeeToDelete = findEmployeeOnProject(filterProjects[0], req);
  if (filterProjects.length === 0
      || !(req.body.employee.hasOwnProperty('id') || req.body.employee.hasOwnProperty('name'))) {
    res.status(400)
      .json({ msg: 'Project invalid! Verify information sent.' });
  } else {
    filterProjects[0].employee = filterProjects[0].employee.filter((emp) => emp.id !== employeeToDelete.id);
    fs.writeFile('src/data/projects.json', JSON.stringify(projectsList), (err) => {
      if (err) {
        res.status(400)
          .send('Cannot edit this project');
      } else {
        res.send('Employee Delete Successfully')
          .json(filterProjects);
      }
    });
  }
  next();
});

//! Get projects
router.get('/getAll', (req, res, next) => {
  res.json(projectsList);
  next();
});

/* Get projects by argument
? On body must have almost 1 params between:
? "id"
? "name"
? "clientName"
? "startDate"
? "endDate"
*/
router.get('/getByArgument', (req, res, next) => {
  const filterProjects = findProjectOnReq(req);
  if (filterProjects.length === 0) {
    res.status(400)
      .send('This data dosen\'t match with any project! Please check data entry');
  } else {
    res.send('Changes done successfully')
      .json(filterProjects);
  }
  next();
});

module.exports = router;
