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

router.put('/:id', (req, res) => {
  const id = req.params.id;
  console.log("the id is", id);
  const name = req.body.name;
  const email = req.body.email;
  Users.updateProfile(id, name, email)
  .then(() => {
    res.redirect(`/users/${id}`);
  });
});

module.exports = router;
