const express = require('express');
const fs = require('fs');
const admins = require('../data/admins.json');

const router = express.Router();

// Add admin method
router.post('/add', (req, res) => {
  const newAdmin = req.body;
  if ((JSON.stringify(newAdmin) !== '{}') && (Object.keys(newAdmin)[0] === 'id')
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
    res.send('Id cannot be repeated or id property name is incorrect');
  }
});

// Get admin method
router.get('/getById/:id', (req, res) => {
  const adminId = req.params.id;
  const foundAdmin = admins.find((admin) => JSON.stringify(admin.id) === adminId);
  if (foundAdmin) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found, missing or incorrect id');
  }
});

// Delete admin method
router.delete('/delete/:id', (req, res) => {
  const adminId = req.params.id;
  if (admins.find((admin) => JSON.stringify(admin.id) === adminId)) {
    const foundAdmin = admins.filter((admin) => JSON.stringify(admin.id) !== adminId);
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

// Filter admin methods
router.get('/getByName/:name', (req, res) => {
  const adminName = req.params.name;
  const foundAdmin = admins.filter((admin) => admin.name === adminName);
  if (foundAdmin.length !== 0) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found, missing or incorrect name');
  }
});
router.get('/getByLastName/:lastName', (req, res) => {
  const adminLastName = req.params.lastName;
  const foundAdmin = admins.filter((admin) => admin.lastName === adminLastName);
  if (foundAdmin.length !== 0) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found, missing or incorrect last name');
  }
});
router.get('/getByEmail/:email', (req, res) => {
  const adminEmail = req.params.email;
  const foundAdmin = admins.find((admin) => admin.email === adminEmail);
  if (foundAdmin !== undefined) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found, missing or incorrect email');
  }
});
router.get('/getByPassword/:password', (req, res) => {
  const adminPassword = req.params.password;
  const foundAdmin = admins.filter((admin) => admin.password === adminPassword);
  if (foundAdmin.length !== 0) {
    res.send(foundAdmin);
  } else {
    res.send('Admin not found, missing or incorrect password');
  }
});

// Edit admin method
router.put('/update/:id', (req, res) => {
  const foundAdmin = admins.some((admin) => JSON.stringify(admin.id) === req.params.id);
  if (foundAdmin) {
    const updateAdmin = req.body;
    admins.forEach((admin) => {
      if (JSON.stringify(admin.id) === req.params.id) {
        admin.name = updateAdmin.name ? updateAdmin.name : admin.name;  // eslint-disable-line
        admin.lastName = updateAdmin.lastName ? updateAdmin.lastName : admin.lastName; // eslint-disable-line
        admin.email = updateAdmin.email ? updateAdmin.email : admin.email; // eslint-disable-line
        admin.password = updateAdmin.password ? updateAdmin.password : admin.password; // eslint-disable-line
        fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
          if (err) {
            res.send('Problem when adding admin');
          } else {
            res.send('Admin created');
          }
        });
        res.json({ msg: 'Admin updated', admin });
      }
    });
  } else {
    res.send('Cant modify unexistent admin');
  }
});

module.exports = router;
