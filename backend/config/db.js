/**
 * @file db.js
 * @description Configuration file for connecting to PostgreSQL database using 'pg' library.
 */

// Import 'pg' library using CommonJS syntax due to ESM compatibility
import pkg from 'pg';
const { Pool } = pkg;

import config from 'config'; // Assuming you use a configuration module like 'config'

/**
 * PostgreSQL database connection pool.
 * @type {Pool}
 */
const pool = new Pool({
  connectionString: config.get('postgresURI'), // Adjust based on your config module
  ssl: {
    rejectUnauthorized: false, // Remove if not using SSL or adjust for your setup
  },
});

/**
 * Connect to PostgreSQL database.
 * Logs successful connection or exits the process on error.
 */
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL Connected...');
    // Optionally, you can release the client back to the pool after connecting
    // client.release();
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
    process.exit(-1); // Exit with error code
  }
};

// Connect to PostgreSQL when this module is imported
connectDB();

export default pool;
