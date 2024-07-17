/**
 * User model definition.
 * @module models/User
 */

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: true,
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

/**
 * Hashes the user's password before saving to the database.
 * @function beforeCreate
 * @memberof module:models/User
 * @param {User} user - User instance being created
 * @returns {Promise<void>} Promise representing completion of hashing process
 */
User.beforeCreate(async (user) => {
  const saltRounds = 10;
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }
});

/**
 * Compares entered password with the stored hashed password.
 * @method matchPassword
 * @memberof module:models/User#
 * @param {string} enteredPassword - Plain text password entered by user
 * @returns {Promise<boolean>} Promise representing whether passwords match
 */
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default User;
