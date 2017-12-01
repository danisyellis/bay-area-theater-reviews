const express = require('express');
const router = express.Router();
const db = require('../../models/db');
const Reviews = require('../../models/reviews');
const auth = require('./auth');
const shows = require('./shows');
const users = require('./users');
const reviews = require('./reviews');
const {isLoggedIn} = require('../authUtils');
const utils = require('../utils');


router.get('/', (req, res) => {
  if(req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
  }
  db.getShows()
  .then(shows => {
    Reviews.find3MostRecent()
    .then(reviews => {
      const formattedDates = utils.shortenDatesInArray(reviews);
      res.render('index', {shows, reviews, formattedDates});
    });
  })
  .catch(err => {console.error("Error:", err);});
});

router.use('/', auth);
router.use('/shows', shows);
router.use(isLoggedIn);
router.use('/users', users);
router.use('/', reviews);

module.exports = router;
