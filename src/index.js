// use "import" to import libraries
import express from 'express';

import mongoose from 'mongoose';

const MONGO_URL = 'mongodb+srv://BaSP-database-ayom-b:BaSP2022@cluster0.esbghj2.mongodb.net/?retryWrites=true&w=majority';
// use "require" to import JSON files
const admins = require('./data/admins.json');
const superAdminsRouter = require('./resources/super-admins');
const employees = require('./resources/employees');
const timeSheetRouter = require('./resources/time-sheets');
const adminRouter = require('./resources/admins');
const projects = require('./resources/projects');
const tasksRouter = require('./resources/tasks');

const tasks = require('./resources/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/admins', adminRouter);
app.use('/superAdmins', superAdminsRouter);
app.use('/timeSheet', timeSheetRouter);
app.use('/projects', projects);
app.use('/employees', employees);
app.use('/tasks', tasksRouter);

app.use('/tasks', tasks);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log(`Fail to connect to database ${error}`);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
