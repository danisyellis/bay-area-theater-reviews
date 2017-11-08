const express = require('express');
const router = express.Router();
const Users = require('../../models/users');

router.get('/:id', (req, res) => {
  console.log("I happen in user route");
  const id = req.params.id;
  Users.getById(id)
  .then(user => {
    user.date_joined = user.date_joined.toDateString();
    res.render('users/show', {user});
  });
});

module.exports = router;
