// use "import" to import libraries
import express from 'express';

const timeSheetRouter = require('./resources/time-sheets');
const projects = require('./resources/projects');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/timeSheet', timeSheetRouter);
app.use('/projects', projects);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
