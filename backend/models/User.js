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
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default User;
