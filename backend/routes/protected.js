import express from 'express';
const router = express.Router();

// Protected route example
router.get('/resource', (req, res) => {
  res.json({ msg: 'Accessed protected resource successfully!', user: req.user });
});

export default router;
