/**
 * @file app.js
 * @description Main server file for the SAFEWORD application
 */

import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import './models/User.js'; // Import User model
import './models/Password.js'; // Import Password model

// Load environment variables from .env file
dotenv.config();

// Initialize the application
const app = express();

// Init middleware to parse JSON
app.use(express.json({ extended: false }));

// Define application routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); // Include profile routes here

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start the server and sync Sequelize
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected...');
    await sequelize.sync({ alter: true }); // Sync models to the database
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  }
};

startServer();

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection at: ${promise}, reason: ${err.message}`);
  // Exit the process with failure
  process.exit(1);
});

export default app;
