/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT;

mongoose.connect(
  process.env.MONGO_URL,
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
