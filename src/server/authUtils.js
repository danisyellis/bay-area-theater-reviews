const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const comparePasswords = (passwordEntered, hashedPassword) => {
  return bcrypt.compare(passwordEntered, hashedPassword);
};

const createSession = (req, res, user) => {
  req.session.user = user;
};

const isLoggedIn = (req, res, next) => {
  if(!req.session.user) {
    res.redirect('/login');
  } else {
    res.locals.isLoggedIn = true;
    //res.locals.user = req.session.user;
    next();
  }
};

module.exports = {
  encryptPassword,
  comparePasswords,
  createSession,
  isLoggedIn
};
