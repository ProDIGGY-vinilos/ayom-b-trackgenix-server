const express = require('express');

const router = express.Router();

const superAdmins = require('../data/super-admins.json');

// Get Super Admins
router.get('/getSuperAdminsById/:id', (req, res) => {
  const superAdminId = req.params.id;
  const foundSuperAdmin = superAdmins.find((superAdmin) => superAdmin.id === superAdminId);
  if (foundSuperAdmin) {
    res.send(foundSuperAdmin);
  } else {
    res.send('SuperAdmin not found');
  }
});
// Edit Super Admins
module.exports = router;
