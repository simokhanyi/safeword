/**
 * @file Password.js
 * @description Mongoose model for Password
 */

import mongoose from 'mongoose';

/**
 * Password Schema
 */
const PasswordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Password = mongoose.model('Password', PasswordSchema);
export default Password;
