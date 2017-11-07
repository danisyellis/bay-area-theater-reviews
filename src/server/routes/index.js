const express = require('express');
const router = express.Router();
const db = require('../../models/db');
const auth = require('./auth');
const albums = require('./albums');
//const users = require('./users');
//const reviews = require('./reviews');

router.get('/', (req, res) => {
  db.getAlbums()
  .then(albums => {
    res.render('index', {albums});
  })
  .catch(err => {console.error("Error:", err);});
});

router.use('/', auth);
router.use('/albums', albums);
//router.use('/users', users);

module.exports = router;
