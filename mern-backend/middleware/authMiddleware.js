const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Agent = require('../models/agentModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Try to find user in both User and Agent collections
      let user = await User.findById(decoded.id).select('-password');
      if (!user) {
        user = await Agent.findById(decoded.id).select('-password');
      }
      
      if (!user) {
        return res.status(401).json({ msg: 'Not authorized, user not found' });
      }
      
      req.user = user;
      next();
    } catch (err) {
      console.error('Token verification failed:', err.message);
      return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

module.exports = protect;
