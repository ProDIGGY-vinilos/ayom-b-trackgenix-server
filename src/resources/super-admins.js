const express = require('express');
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const router = express.Router();

// CREATE SUPER-ADMIN
router.post('/add', (req, res) => {
  const newSuperAdmin = req.body;
  const newID = Number(superAdmins[superAdmins.length - 1].id) + 1;
  newSuperAdmin.id = newID.toString();
  superAdmins.push(newSuperAdmin);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), (err) => {
    if (err) {
      res.send('Can not save new SuperAdmin');
    } else {
      res.send('SuperAdmin created successfully');
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

module.exports = router;
