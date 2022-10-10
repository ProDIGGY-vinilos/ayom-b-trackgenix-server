// use "import" to import libraries
import express from 'express';

const timeSheets = require('./data/time-sheets.json');
const timeSheetRouter = require('./resources/time-sheets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/timeSheet', timeSheetRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/timeSheets', (req, res) => {
  res.status(200).json({
    data: timeSheets,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
