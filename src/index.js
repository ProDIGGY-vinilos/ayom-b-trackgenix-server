/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const MONGO_URL = 'mongodb+srv://BaSP-database-ayom-b:BaSP2022@cluster0.esbghj2.mongodb.net/?retryWrites=true&w=majority';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

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
