const express = require('express');
const fs = require('fs');

const employees = require('../data/employees.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(employees);
});

router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  const checkEmployee = employees.find((employee) => employee.id === employeeId);
  if (checkEmployee) {
    res.send(checkEmployee);
  } else {
    res.send('Employee NOT FOUND');
  }
});

router.delete('/delete/:id', (req, res) => {
  const employeeId = req.params.id;
  const findEmployee = employees.find((employee) => employee.id === employeeId);
  const filteredEmployee = employees.filter((employee) => employee.id !== employeeId);
  if (!findEmployee) {
    res.send('Employee NOT FOUND');
  } else {
    res.send(`Employee deleted ${findEmployee.name}`);
    fs.writeFile('src/data/employees.json', JSON.stringify(filteredEmployee), (err) => {
      if (err) {
        res.send('Error trying to delete employee');
      }
    });
  }
});

module.exports = router;
