const express = require('express');
const fs = require('fs');

const router = express.Router();

const superAdmins = require('../data/super-admins.json');

// Get Super Admins
router.get('/getAllSuperAdmins', (req, res) => {
  if (superAdmins) {
    res.send(superAdmins);
  } else {
    res.send('Super Admins not found');
  }
});
router.get('/getSuperAdminsById/:id', (req, res) => {
  const superAdminId = req.params.id;
  const foundSuperAdmin = superAdmins.find((superAdmin) => superAdmin.id === superAdminId);
  if (foundSuperAdmin) {
    res.send(foundSuperAdmin);
  } else {
    res.send('Super Admin not found');
  }
});
// Edit Super Admins
router.put('/modifySuperAdmins/:id', (req, res) => {
  let counterData = 0;
  const foundSA = superAdmins.find((superAdmin) => superAdmin.id === req.params.id);
  const editSA = req.body;
  if (!foundSA) {
    res.send('The user does not exist.');
  } else {
    foundSA.name === editSA.name ? counterData += 1 : foundSA.name = editSA.name; // eslint-disable-line
    foundSA.lastName === editSA.lastName ? counterData += 1 : foundSA.lastName = editSA.lastName; // eslint-disable-line
    foundSA.email === editSA.email ? counterData += 1 : foundSA.email = editSA.email; // eslint-disable-line
    foundSA.password === editSA.password ? counterData += 1 : foundSA.password = editSA.password; // eslint-disable-line
    const index = superAdmins.indexOf(foundSA);
    superAdmins[index] = editSA;
    if (counterData === 4) {
      res.send('The new data is the same as the old one');
    } else {
      fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
        if (err) {
          res.send('Cannot edit the user.');
        } else {
          res.send('User edited successfully.');
        }
      });
    }
  }
});

module.exports = router;
