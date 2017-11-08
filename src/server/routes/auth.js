const express = require('express');
const router = express.Router();
const Users = require('../../models/users');
const authUtils = require('../authUtils');

router.get('/signup', (req, res) => {
  if(req.session.user) {
    res.redirect(`users/${req.session.user.id}`);
  }
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
      authUtils.createSession(req, res, user);
      res.redirect(`users/${user.id}`);
    })
    .catch(error => {
      let message = 'That email is already in our system. Please choose another.';
      res.render('auth/signup', {message});
    });
  })
  .catch(err => {console.log("Could not create user. Error: ", err);});
});

router.get('/login', (req, res) => {
  if(req.session.user) {
    res.redirect(`users/${req.session.user.id}`);
  }
  let message;
  res.render('auth/login', {message});
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const unencryptedPassword = req.body.password;
  Users.getByEmail(email)
  .then(user => {
    console.log("USER: ", user);
    authUtils.comparePasswords(unencryptedPassword, user.password)
    .then(passwordsMatch => {
      if(passwordsMatch) {
        authUtils.createSession(req,res, user);
        res.redirect(`users/${user.id}`);
      } else {
        let message = "Username and password don't match.";
        res.render('auth/login', {message});
      }
    });
  })
  .catch(err => {
    console.log("Error: ", err);
    let message = "Username and password don't match.";
    res.render('auth/login', {message});
  });
});

router.get('/signout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });  
});

module.exports = router;
