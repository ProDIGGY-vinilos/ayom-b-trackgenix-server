const express = require('express');

const router = express.Router();
const projects = require('../data/projects.json');

router.get('/:id', (req, res) => {
  const found = projects.find((project) => String(project.id) === req.params.id);
  if (found) {
    res.status(200).json(projects.filter((project) => String(project.id) === req.params.id));
  } else {
    res.status(400).json({ msg: `No project with the id of ${req.params.id}` });
  }
});

module.exports = router;
