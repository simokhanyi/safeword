/**
 * @file profile.js
 * @description Routes for user profile
 */

import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js'; // Assuming User model is imported
import Password from '../models/Password.js'; // Assuming Password model is imported

const router = express.Router();

/**
 * @route GET /api/profile
 * @desc Get user profile with associated passwords
 * @access Private
 */
router.get('/', auth, async (req, res) => {
  try {
    // Fetch user profile details
    const userProfile = await User.findById(req.user.id).select('-password'); // Exclude password from response

    if (!userProfile) {
      return res.status(404).json({ msg: 'User profile not found' });
    }

    // Fetch passwords associated with the user
    const passwords = await Password.find({ user: req.user.id });

    res.json({ user: userProfile, passwords });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
