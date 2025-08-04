const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is admin, proceed
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = isAdmin;
