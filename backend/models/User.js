/**
 * @file User.js
 * @description Sequelize model for User
 */

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

/**
 * User Model
 */
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null values for name
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // Email cannot be null
    unique: true, // Email must be unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Password cannot be null
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Default value for date is current timestamp
  },
});

export default User;
