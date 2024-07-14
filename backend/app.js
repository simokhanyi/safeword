/**
 * @file app.js
 * @description Main server file for the SAFEWORD application
 */

import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';

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

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection at: ${promise}, reason: ${err.message}`);
  // Close the PostgreSQL pool on unhandled rejections if needed
  db.end(); // Adjust according to your PostgreSQL pool handling
  // Exit the process with failure
  process.exit(1);
});
