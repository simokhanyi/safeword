const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).send('Unauthorized');
  }

  // Verify token validity (replace 'your_secret_key' with your actual secret)
  try {
    const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNzIxMTM2ODUwLCJleHAiOjE3MjE1Njg4NTB9.9Qwqx8MrL6dbMJ_w8PktDeOcRswSYH7qQR-9sm8szps');
    req.user = decoded.user; // Attach user data to request object for further use
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).send('Invalid token');
  }
}

module.exports = verifyToken;
