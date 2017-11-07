const express = require('express');
const router = express.Router();
const usersDb = require('../../models/users');

router.get('/signup', (req, res) => {
  let message;
  res.render('auth/signup', {message});
});

router.post('/signup', (req, res) => {

});

router.get('/login', (req, res) => {
  let message;
  res.render('auth/login', {message});
});

router.post('/login', (req, res) => {

});

module.exports = router;
