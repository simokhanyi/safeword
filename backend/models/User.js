/**
 * @file User.js
 * @description Mongoose model for User
 */

import mongoose from 'mongoose';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
