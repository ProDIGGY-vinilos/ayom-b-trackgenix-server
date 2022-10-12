const express = require('express');
const fs = require('fs');

const employees = require('../data/employees.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(employees);
});

router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  const checkEmployee = employees.find((employee) => employee.id === employeeId);
  if (checkEmployee) {
    res.send(checkEmployee);
  } else {
    res.send(`Employee with the Id ${employeeId} NOT FOUND`);
  }
});

router.delete('/delete/:id', (req, res) => {
  const employeeId = req.params.id;
  const foundEmployee = employees.find((employee) => employee.id === employeeId);
  const filteredEmployee = employees.filter((employee) => employee.id !== employeeId);
  if (!foundEmployee) {
    res.send(`Employee with the Id ${employeeId} NOT FOUND`);
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployee), (err) => {
      if (err) {
        res.send('Error trying to delete employee');
      } else {
        res.send(`Employee deleted ${foundEmployee.name}`);
      }
    });
  }
});

module.exports = router;
