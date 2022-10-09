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

// Filter admins method
router.get('/getListAdmin/:id/:name/:lastName/:email/:password', (req, res) => {
  const adminId = req.params.id;
  const adminName = req.params.name;
  const adminLastName = req.params.lastName;
  const adminEmail = req.params.email;
  const adminPass = req.params.password;
  let counter = 0;
  let counter2 = 0;
  let counter3 = 0;

  const foundAdmin = admins.filter((admin) => {
    if (JSON.stringify(admin.id) === adminId && counter === 0) {
      counter = 1;
      counter3 = 1;
      return true;
    }
    if (admin.email === adminEmail && counter === 0) {
      counter = 1;
      counter3 = 1;
      return true;
    }
    if ((admin.name === adminName || admin.lastName === adminLastName
         || admin.password === adminPass)
      && (adminId === ':id' && adminEmail === ':email') && counter2 === 0) {
      switch (true) {
        case admin.name === adminName && admin.lastName === adminLastName
        && admin.password === adminPass:
          counter3 = 1;
          counter2 = 1;
          return true;
        case admin.name === adminName && admin.lastName === adminLastName:
          if (adminPass !== ':password') {
            return false;
          }
          counter3 = 1;
          counter2 = 1;
          return true;
        case admin.lastName === adminLastName && admin.password === adminPass:
          if (adminName !== ':name') {
            return false;
          }
          counter3 = 1;
          counter2 = 1;
          return true;
        case admin.name === adminName && admin.password === adminPass:
          if (adminLastName !== ':lastName') {
            return false;
          }
          counter3 = 1;
          counter2 = 1;
          return true;
        default:
          switch (true) {
            case adminName !== ':name' && adminLastName !== ':lastName':
              return false;
            case adminLastName !== ':lastName' && adminPass !== ':password':
              return false;
            case adminName !== ':name' && adminPass !== ':password':
              return false;
            default:
              counter3 = 1;
              return true;
          }
      }
    }
    return false;
  });
  if (counter3 === 0) {
    res.send('Non existent admin');
  }
  res.send(foundAdmin);
});

module.exports = router;
