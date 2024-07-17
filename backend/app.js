/**
 * @file app.js
 * @description Main server file for the SAFEWORD application
 */

import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import { auth, register, login } from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import protectedRoutes from './routes/protected.js';
import jwtMiddleware from './middleware/jwtMiddleware.js';
import './models/User.js';
import './models/Password.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the application
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define application routes using imported middleware functions
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.use('/api/profile', jwtMiddleware, profileRoutes);
app.use('/api/protected', jwtMiddleware, protectedRoutes);

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
    await sequelize.sync({ alter: true });
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
