const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }

  try {
    const bearer = token.split(' ')[1]; // "Bearer <token>"
    const decoded = jwt.verify(bearer || token, process.env.JWT_SECRET);

    // ✅ Normalize ID to ObjectId
    req.user = {
      ...decoded,
      id: new mongoose.Types.ObjectId(decoded.id)
    };

  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  
  next();
};

const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };