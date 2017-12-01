const express = require('express');
const router = express.Router();
const Users = require('../../models/users');
const Reviews = require('../../models/reviews');
const utils = require('../utils');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Users.getById(id)
  .then(user => {
    user.date_joined = user.date_joined.toDateString();
    Reviews.getByUserId(id)
    .then(reviews => {
      const formattedDates = utils.shortenDatesInArray(reviews);
      res.render('users/display', {user, reviews, formattedDates});
    })
    .catch(error => {
      res.status(500).render('common/error', {error});
      console.log("ERROR: ", error);
    });
  });
});

module.exports = router;
