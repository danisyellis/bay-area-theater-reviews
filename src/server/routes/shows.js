const express = require('express');
const router = express.Router();
const db = require('../../models/shows');
const Reviews = require('../../models/reviews');
const utils = require('../utils');


router.get('/', (req,res) => {
  db.getShows()
  .then(shows => {
    if(req.session.user) {
      res.locals.isLoggedIn = true;
    }
    res.render('shows', {shows});
  })
  .catch(err => {
    console.error("Error:", err);
  });
});

router.get('/new', (req, res) => {
  if(req.session.user) {
    res.locals.isLoggedIn = true;
    res.render('shows/new');
  }
  else {
    let message = "Please sign in to add a new show.";
    res.render('auth/login', {message});
  }
});

router.post('/new', (req, res) => {
  if(req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
    const title = req.body.title;
    const venue = req.body.venue;
    const genre = req.body.genre;
    const date_opens = req.body.date_opens;
    const date_closes = req.body.date_closes;
    const url = req.body.url;
    const created_by_user_id = res.locals.user.id;
    console.log(`Title ${title}, venue: ${venue}, genre: ${genre}, date_opens: ${date_opens}, date_closes: ${date_closes}, url: ${url}, created_by_user_id: ${created_by_user_id}`);
    db.create(title, venue, genre, date_opens, date_closes, url, created_by_user_id)
    .then((show) => {
      const showId = show.id;
      res.redirect(`/shows/${showId}`);
    })
    .catch(error => {
      res.status(500).render('common/error', {error});
      console.log("ERROR: ", error);
    });
  } else {
    let message = "Please sign in to submit a new show";
    res.render('auth/login', {message});
  }

});

router.get('/:showId', (req, res) => {
  if(req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
  }
  const showId = req.params.showId;
  let formattedStartDate;
  let formattedEndDate;
  db.getShowById(showId)
  .then(show => {
    if(show.date_opens) {
      formattedStartDate = show.date_opens.toDateString();
    }
    if(show.date_closes) {
      formattedEndDate = show.date_closes.toDateString();
    }
    Reviews.getByShowId(showId)
    .then(reviews => {
      let formattedDates = utils.shortenDatesInArray(reviews);
      res.render('shows/display', {show, reviews, formattedDates, formattedStartDate, formattedEndDate});
    });
  })
  .catch(err => {console.error("Error:", err);});
});

module.exports = router;
