const jwt = require('jsonwebtoken');

// Auth middleware to verify token
module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
