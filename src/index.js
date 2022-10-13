// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const superAdminsRouter = require('./resources/super-admins');
const employees = require('./resources/employees');
const timeSheetRouter = require('./resources/time-sheets');
const adminRouter = require('./resources/admins');
const projects = require('./resources/projects');

const tasks = require('./resources/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/admins', adminRouter);
app.use('/superAdmins', superAdminsRouter);
app.use('/timeSheet', timeSheetRouter);
app.use('/projects', projects);
app.use('/employees', employees);

app.use('/tasks', tasks);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
