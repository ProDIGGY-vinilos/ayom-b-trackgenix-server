const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

// CREATE SUPER-ADMIN
router.post('/add', (req, res) => {
  const newSuperAdmin = req.body;
  if (Object.keys(newSuperAdmin).length !== 5) {
    res.send('Please, complete all fields');
    return;
  }
  if (Object.keys(newSuperAdmin)[0] !== 'id' || Object.keys(newSuperAdmin)[1] !== 'name'
  || Object.keys(newSuperAdmin)[2] !== 'lastName' || Object.keys(newSuperAdmin)[3] !== 'email'
  || Object.keys(newSuperAdmin)[4] !== 'password') {
    res.send('Incorrct or unordered properties');
    return;
  }
  superAdmins.push(newSuperAdmin);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
    if (err) {
      res.send('Can not save new SuperAdmin');
    } else {
      res.send(`SuperAdmin created successfully: ${JSON.stringify(newSuperAdmin)}`);
    }
  });
});

// DELETE SUPER-ADMIN
router.delete('/delete/:id', (req, res) => {
  const superAdminsId = req.params.id;
  if (superAdmins.find((superAdmin) => superAdmin.id === req.params.id)) {
    const filteredSuperAdmins = superAdmins.filter((superAdmin) => superAdmin.id !== superAdminsId);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(filteredSuperAdmins), (err) => {
      if (err) {
        res.send('Can not delete SuperAdmin');
      } else {
        res.send('SuperAdmin deleted successfully');
      }
    });
  } else {
    res.send('Non-existing SuperAdmin');
  }
});

// GET BY FILTERS
router.get('/getById/:id', (req, res) => {
  const superAdminsId = req.params.id;
  const foundSuperAdmin = superAdmins.find((superAdm) => superAdm.id === superAdminsId);
  if (foundSuperAdmin) {
    res.send(foundSuperAdmin);
  } else {
    res.send('SuperAdmin not found');
  }
});
router.get('/getByName/:name', (req, res) => {
  const foundSuperAdmins = [];
  superAdmins.forEach((superAdmin) => {
    if (superAdmin.name === req.params.name) {
      foundSuperAdmins.push(superAdmin);
    }
  });
  if (foundSuperAdmins) {
    res.send(foundSuperAdmins);
  } else {
    res.send('SuperAdmin not found');
  }
});
router.get('/getByLastName/:lastName', (req, res) => {
  const foundSuperAdmins = [];
  superAdmins.forEach((superAdmin) => {
    if (superAdmin.lastName === req.params.lastName) {
      foundSuperAdmins.push(superAdmin);
    }
  });
  if (foundSuperAdmins) {
    res.send(foundSuperAdmins);
  } else {
    res.send('SuperAdmin not found');
  }
});
router.get('/getByEmail/:email', (req, res) => {
  const superAdminsEmail = req.params.email;
  const foundSuperAdmin = superAdmins.find((superAdm) => superAdm.email === superAdminsEmail);
  if (foundSuperAdmin) {
    res.send(foundSuperAdmin);
  } else {
    res.send('SuperAdmin not found');
  }
});
router.get('/getByPassword/:password', (req, res) => {
  const foundSuperAdmins = [];
  superAdmins.forEach((superAdmin) => {
    if (superAdmin.password === req.params.password) {
      foundSuperAdmins.push(superAdmin);
    }
  });
  if (foundSuperAdmins) {
    res.send(foundSuperAdmins);
  } else {
    res.send('SuperAdmin not found');
  }
});

module.exports = router;
