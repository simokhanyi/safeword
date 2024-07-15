import express from 'express';
import { check, validationResult } from 'express-validator';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  '/register',
  [
    // Validate email
    check('email', 'Please include a valid email').isEmail(),
    // Validate password
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await registerUser(req, res); // Delegate registration logic to controller
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user & get token (Login)
 * @access Public
 */
router.post(
  '/login',
  [
    // Validate email
    check('email', 'Please include a valid email').isEmail(),
    // Validate password
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await loginUser(req, res); // Delegate login logic to controller
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

export default router;
