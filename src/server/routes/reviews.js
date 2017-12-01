const express = require('express');
const router = express.Router();
const db = require('../../models/shows');
const Reviews = require('../../models/reviews');

router.get(`/shows/:showId/reviews/new`, (req, res) => {
  const showId = req.params.showId;
  db.getShowById(showId)
  .then(show => {
    res.render('reviews/new', {show});
  })
  .catch(error => {
    res.status(500).render('common/error', {error});
    console.log("ERROR: ", error);
  });
});

router.post(`/shows/:showId/reviews/new`, (req, res) => {
  const showId = req.params.showId;
  const review = req.body.newReview;
  const userId = res.locals.user.id;
  Reviews.create(review, userId, showId)
  .then(() => {
    res.redirect(`/shows/${showId}`);
  })
  .catch(error => {
    res.status(500).render('common/error', {error});
    console.log("ERROR: ", error);
  });
});

//TODO: add better auth
router.delete('/shows/:showId/reviews/:reviewId', (req, res) => {
  Reviews.destroy(req.params.reviewId)
  .then((fetchResponse) => {
    res.send('Review deleted sucessfully');
  })
  .catch((err) => {
    res.status(500).send('Error deleting review: ', err);
  });
});

module.exports = router;
