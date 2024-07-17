/**
 * @file auth.js
 * @description Middleware to verify JWT token and authenticate user
 */

import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User.js';

/**
 * Middleware to authenticate user using JWT token
 */
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

/**
 * Middleware to handle user registration
 */
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists, try logging in' });
    }

    // Create a new user if the user does not exist
    user = new User({
      email,
      password
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (tokenErr, token) => {
        if (tokenErr) throw tokenErr;
        res.json({
          msg: 'Registration successful',
          token,
          user: {
            id: user.id
          }
        });
      }
    );
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).send('Server Error');
  }
};

/**
 * Middleware to handle user login
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (tokenErr, token) => {
        if (tokenErr) throw tokenErr;
        res.json({
          msg: 'Login successful',
          token
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send('Server Error');
  }
};

export { authMiddleware as auth, register, login };
