const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

// Add admin method
router.post('/addAdmin', (req, res) => {
  const newAdmin = req.body;
  if ((JSON.stringify(newAdmin) !== '{}')
  && !(admins.find((admin) => JSON.stringify(admin.id) === JSON.stringify(newAdmin.id)))) {
    if (Object.keys(newAdmin)[1] === 'name' && Object.keys(newAdmin)[2] === 'lastName'
     && Object.keys(newAdmin)[3] === 'email' && Object.keys(newAdmin)[4] === 'password') {
      admins.push(newAdmin);
      fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
        if (err) {
          res.send('Problem when adding admin');
        } else {
          res.send('Admin created');
        }
      });
    } else {
      res.send('Missing, incorrect or unordered properties');
    }
  } else if (JSON.stringify(newAdmin) === '{}') {
    res.send('Cannot add empty admin');
  } else {
    res.send('Id cannot be repeated');
  }
});

// Get admin method
router.get('/getAdminById/:id', (req, res) => {
  const AdminId = req.params.id;
  const foundAdmin = admins.find((admin) => JSON.stringify(admin.id) === AdminId);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found');
  }
});

// Delete admin method
router.delete('/deleteAdmin/:id', (req, res) => {
  const AdminId = req.params.id;
  if (admins.find((admin) => JSON.stringify(admin.id) === AdminId)) {
    const foundAdmin = admins.filter((admin) => JSON.stringify(admin.id) !== AdminId);
    fs.writeFile('src/data/admins.json', JSON.stringify(foundAdmin), (err) => {
      if (err) {
        res.send('Cannot delete admin');
      } else {
        res.send('Admin deleted');
      }
    });
  } else {
    res.send('Non existent admin');
  }
});

module.exports = router;
