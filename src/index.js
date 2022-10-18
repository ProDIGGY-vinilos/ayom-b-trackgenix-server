/* eslint-disable no-console */
// use "import" to import libraries
import express from 'express';
import mongoose from 'mongoose';
import tasksRouter from './routes/tasks';
import adminRouter from './routes/admins';

import employeeRouter from './routes/employees';

const MONGO_URL = 'mongodb+srv://BaSP-database-ayom-b:BaSP2022@cluster0.esbghj2.mongodb.net/?retryWrites=true&w=majority';
const superAdminsRouter = require('./resources/super-admins');
const timeSheetRouter = require('./resources/time-sheets');
const projects = require('./resources/projects');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/admins', adminRouter);
app.use('/superAdmins', superAdminsRouter);
app.use('/timeSheet', timeSheetRouter);
app.use('/projects', projects);
app.use('/employees', employeeRouter);
app.use('/tasks', tasksRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log(`Fail to connect to database ${error}`);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);
