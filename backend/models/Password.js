/**
 * @file Password.js
 * @description Sequelize model for Password
 */

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

/**
 * Password Model
 */
const Password = sequelize.define('Password', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Define associations
Password.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Password, { foreignKey: 'userId' });

export default Password;
