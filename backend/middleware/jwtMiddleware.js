import jwt from 'jsonwebtoken';

const jwtMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(' ')[1];

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied, no token' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Set user in request object for further use in routes
    next(); // Move to next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default jwtMiddleware;
