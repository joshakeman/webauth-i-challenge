module.exports = (req, res, next) => {
    if (req.session && req.session.name) {
      next();
    } else {
      res.status(401).json({ message: 'Please login to access this resource' });
    }
  };