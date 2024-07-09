/**
 * @file profile.js
 * @description Routes for user profile
 */

import express from 'express';
import auth from '../middleware/auth.js';
import Password from '../models/Password.js';

const router = express.Router();

/**
 * @route GET /api/profile
 * @desc Get user profile with passwords
 * @access Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id });
    res.json(passwords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
