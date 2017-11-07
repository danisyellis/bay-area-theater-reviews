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

const isLoggedIn = () => {
  //is there a user?
    //if no, redirect to login
    //if yes, res.locals.isLoggedIn = false and set res.locals.user, then next()
};

module.exports = {
  encryptPassword,
  comparePasswords,
  createSession,
  isLoggedIn
};
