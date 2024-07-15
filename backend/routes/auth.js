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
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user & get token (Login)
 * @access Public
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

export default router;
