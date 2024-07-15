/**
 * @file db.js
 * @description Configuration file for connecting to PostgreSQL database using Sequelize.
 */

import { Sequelize } from 'sequelize';
import config from 'config'; // Assuming you use a configuration module like 'config'

// Get PostgreSQL URI from configuration
const postgresURI = config.get('postgresURI');

// Initialize Sequelize with the PostgreSQL connection URI
const sequelize = new Sequelize(postgresURI, {
  dialect: 'postgres',
  logging: false, // Set to true to see SQL queries in console
});

// Function to connect to PostgreSQL
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected...');
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
    process.exit(-1); // Exit with error code
  }
};

// Connect to PostgreSQL when this module is imported
connectDB();

export default sequelize;
