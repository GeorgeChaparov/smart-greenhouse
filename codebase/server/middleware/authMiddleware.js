module.exports = function requireLogin(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
};
