module.exports = (req, res, next) => {
    console.log(req.session)

    if (req.session && req.session.newkey) {
      next();
    } else {
      res.status(401).json({ message: 'Please login to access this resource' });
    }
  };