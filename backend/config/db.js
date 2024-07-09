/**
 * @file db.js
 * @description Configuration file for connecting to MongoDB
 */

import mongoose from 'mongoose';
import config from 'config';

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Create indexes after connection is established
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
