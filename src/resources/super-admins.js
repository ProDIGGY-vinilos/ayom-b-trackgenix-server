const express = require('express');
const fs = require('fs');

const router = express.Router();

const superAdmins = require('../data/super-admins.json');

// Get Super Admins
router.get('/', (req, res) => {
  if (superAdmins) {
    res.send(superAdmins);
  } else {
    res.send('Super Admins not found');
  }
});

// Get Super Admins by ID
router.get('/getById/:id', (req, res) => {
  const superAdminId = req.params.id;
  const foundSuperAdmin = superAdmins.find((superAdmin) => superAdmin.id === superAdminId);
  if (foundSuperAdmin) {
    res.send(foundSuperAdmin);
  } else {
    res.send(`Super admin with the id ${superAdminId} not found`);
  }
});

// Edit Super Admins
router.put('/update/:id', (req, res) => {
  let counterData = 0;
  const superAdminId = req.params.id;
  const foundSuperAdmin = superAdmins.find((superAdmin) => superAdmin.id === req.params.id);
  const editSuperAdmin = req.body;
  if (!foundSuperAdmin) {
    res.send(`Super admin with the id ${superAdminId} not found`);
  } else {
    if (foundSuperAdmin.name === editSuperAdmin.name) {
      counterData += 1;
    } else {
      foundSuperAdmin.name = editSuperAdmin.name;
    }
    if (foundSuperAdmin.lastName === editSuperAdmin.lastName) {
      counterData += 1;
    } else {
      foundSuperAdmin.lastName = editSuperAdmin.lastName;
    }
    if (foundSuperAdmin.email === editSuperAdmin.email) {
      counterData += 1;
    } else {
      foundSuperAdmin.email = editSuperAdmin.email;
    }
    if (foundSuperAdmin.password === editSuperAdmin.password) {
      counterData += 1;
    } else {
      foundSuperAdmin.password = editSuperAdmin.password;
    }
    const index = superAdmins.indexOf(foundSuperAdmin);
    superAdmins[index] = editSuperAdmin;
    if (counterData === 4) {
      res.send('The new data is the same as the old one');
    } else {
      fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
        if (err) {
          res.send(`Could not edit super admin with id ' ${superAdminId}`);
        } else {
          res.send(`Super admin updated successfully: ${JSON.stringify(editSuperAdmin, null, 2)}`);
        }
      });
    }
  }
});

module.exports = router;
