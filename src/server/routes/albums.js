const express = require('express');
const router = express.Router();
const db = require('../../models/db');


router.get('/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  db.getAlbumsById(albumId)
  .then(album => {
    res.render('album', {album});
  })
  .catch(err => {console.error("Error:", err);});
});

module.exports = router;
