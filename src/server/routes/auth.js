const express = require('express');
const router = express.Router();
const Users = require('../../models/users');
const authUtils = require('../authUtils');

router.get('/signup', (req, res) => {
  let message;
  res.render('auth/signup', {message});
});

router.post('/signup', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const unencryptedPassword = req.body.password;
  authUtils.encryptPassword(unencryptedPassword)
  .then(encryptedPassword => {
    Users.create(name, email, encryptedPassword)
    .then(user => {
      res.redirect('users/show');
    });
  })
  .catch(err => {console.log("Error: ", err);});
});

router.get('/login', (req, res) => {
  let message;
  res.render('auth/login', {message});
});

router.post('/login', (req, res) => {

});

module.exports = router;
