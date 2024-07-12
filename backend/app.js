/**
 * @file app.js
 * @description Main server file for the SAFEWORD application
 */

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the application
const app = express();

/**
 * @function connectDB
 * @description Connects to the MongoDB database using mongoose
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

// Connect to the database
connectDB();

// Init middleware to parse JSON
app.use(express.json({ extended: false }));

// Define application routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
