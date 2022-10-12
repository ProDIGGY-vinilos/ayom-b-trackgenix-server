// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const employees = require('./resources/employees');
const timeSheetRouter = require('./resources/time-sheets');
const adminRouter = require('./resources/admins');
const projects = require('./resources/projects');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/admins', adminRouter);
app.use('/timeSheet', timeSheetRouter);
app.use('/projects', projects);

app.use('/employees', employees);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
