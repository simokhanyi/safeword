/**
 * @file profile.js
 * @description Routes for user profile
 */

import express from 'express';
import { auth } from '../middleware/auth.js'; // Import the auth middleware
import User from '../models/User.js';
import Password from '../models/Password.js';

const router = express.Router();

/**
 * @route GET /api/profile
 * @desc Get logged-in user's profile with associated passwords
 * @access Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const userProfile = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!userProfile) {
      return res.status(404).json({ msg: 'User profile not found' });
    }
    const passwords = await Password.findAll({ where: { userId: req.user.id } });
    res.json({ user: userProfile, passwords });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route PUT /api/profile/update
 * @desc Update logged-in user's profile
 * @access Private
 */
router.put('/update', auth, async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
    const userProfile = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!userProfile) {
      return res.status(404).json({ msg: 'User profile not found after update' });
    }
    res.json({ user: userProfile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

/**
 * @route GET /api/profile/:id
 * @desc Get user profile by ID with associated passwords
 * @access Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const userProfile = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!userProfile) {
      return res.status(404).json({ msg: 'User profile not found' });
    }
    const passwords = await Password.findAll({ where: { userId: req.params.id } });
    res.json({ user: userProfile, passwords });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
