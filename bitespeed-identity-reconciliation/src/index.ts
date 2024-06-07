import express from 'express';
import { sequelize } from './sequelize';
import identifyRoute from './routes/identify';

const app = express();
const port = 3300;

app.use(express.json());
app.use('/identify', identifyRoute);

const startServer = async () => {
  try {
    await sequelize.authenticate(); // Use authenticate instead of sync to check connection
    console.log('Connection to the database has been established successfully.');

    await sequelize.sync(); // Sync models with the database

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
