const express = require('express');
const router = express.Router();
const db = require('../../models/db');


router.get('/:albumId', (req, res) => {
  if(req.session.user) {
    res.locals.isLoggedIn = true;
    res.locals.user = req.session.user;
  }
  const albumId = req.params.albumId;
  db.getAlbumsById(albumId)
  .then(album => {
    res.render('album', {album});
  })
  .catch(err => {console.error("Error:", err);});
});

module.exports = router;
