const express = require('express');
const fs = require('fs');
const employees = require('../data/employees.json');

const router = express.Router();

router.post('/add', (req, res) => {
  const newEmployee = req.body;
  const newEmployeeKeys = Object.keys(newEmployee);
  if (newEmployeeKeys.length < 6) {
    res.send('Please complete all fields');
  } else {
    employees.push(newEmployee);
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.send('New user not saved.');
      } else {
        res.send('New user created.');
      }
    });
  }
});

router.put('/edit', (req, res) => {
  let dataError = 0;
  const editEmployee = req.body;
  const oldEmployee = employees.find((employee) => employee.id === editEmployee.id);
  // si no se encuentra el usuario a editar, hay que crearlo?
  if (!oldEmployee) {
    res.send('The user does not exist.');
  } else {
    if (oldEmployee.name === editEmployee.name) {
      dataError += 1;
    } else {
      oldEmployee.name = editEmployee.name;
    }
    if (oldEmployee.lastName === editEmployee.lastName) {
      dataError += 1;
    } else {
      oldEmployee.lastName = editEmployee.lastName;
    }
    if (oldEmployee.phone === editEmployee.phone) {
      dataError += 1;
    } else {
      oldEmployee.phone = editEmployee.phone;
    }
    if (oldEmployee.email === editEmployee.email) {
      dataError += 1;
    } else {
      oldEmployee.email = editEmployee.email;
    }
    if (oldEmployee.password === editEmployee.password) {
      dataError += 1;
    } else {
      oldEmployee.password = editEmployee.password;
    }
    if (dataError === 5) {
      res.send('New employee data is the same as previous!');
    } else {
      fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
        if (err) {
          res.send('Could not edit user.');
          // como hacer saltar el error del fs?
        } else {
          res.send('User edited successfully.');
        }
      });
    }
  }
});

module.exports = router;
