const express = require('express');
const router = express.Router();
const db = require('../../models/db');
const Reviews = require('../../models/reviews');
const utils = require('../utils');


router.get('/:albumId', (req, res) => {
  if(req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
  }
  const albumId = req.params.albumId;
  db.getAlbumById(albumId)
  .then(album => {
    Reviews.getByAlbumId(albumId)
    .then(reviews => {
      const formattedDates = utils.shortenDatesInArray(reviews);
      res.render('album', {album, reviews, formattedDates});
    });
  })
  .catch(err => {console.error("Error:", err);});
});

module.exports = router;
