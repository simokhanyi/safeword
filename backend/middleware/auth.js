import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

/**
 * Middleware to verify JWT token from request header.
 * Sets req.user if token is valid, else returns 401 Unauthorized.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
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
 * Register a new user.
 * Hashes password before saving to database.
 * Generates and returns JWT token upon successful registration.
 * @param {Object} req - Express request object with user details in req.body
 * @param {Object} res - Express response object
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ msg: 'User already exists, try logging in' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = { user: { id: user.id } };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (tokenErr, token) => {
      if (tokenErr) throw tokenErr;
      res.json({ msg: 'Registration successful', token, user: { id: user.id } });
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).send('Server Error');
  }
};

/**
 * Login user with email and password.
 * Generates and returns JWT token upon successful login.
 * @param {Object} req - Express request object with user credentials in req.body
 * @param {Object} res - Express response object
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (tokenErr, token) => {
      if (tokenErr) throw tokenErr;
      res.json({ msg: 'Login successful', token });
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send('Server Error');
  }
};

export { authMiddleware as auth, register, login };
