const express = require('express');
const router = express.Router();
const db = require('../../models/db');
const Reviews = require('../../models/reviews');
const utils = require('../utils');


router.get('/', (req,res) => {
  db.getShows()
  .then(shows => {
    res.render('shows', {shows});
  })
  .catch(err => {
    console.error("Error:", err);
  });
});

router.get('/:showId', (req, res) => {
  if(req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
  }
  const showId = req.params.showId;
  db.getShowById(showId)
  .then(show => {
    Reviews.getByShowId(showId)
    .then(reviews => {
      const formattedDates = utils.shortenDatesInArray(reviews);
      res.render('shows/display', {show, reviews, formattedDates});
    });
  })
  .catch(err => {console.error("Error:", err);});
});

module.exports = router;
