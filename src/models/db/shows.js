const {db} = require('./index');

function getAll() {
  return db.any(`
    SELECT * FROM shows`)
  .catch(err => {
    console.log("Error: ", err);
    throw err;
  });
}

function getById(showId) {
  return db.oneOrNone(`
    SELECT * FROM shows
    WHERE id = $1
  `, [showId])
  .catch(err => {
    console.log("Error: ", err);
    throw err;
  });
}

function create(title, venue, genre, date_opens, date_closes, url, created_by_user_id) {
  console.log('entering create function')
  return db.oneOrNone(`
    INSERT INTO shows (title, venue, genre, date_opens, date_closes, url, created_by_user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `, [title, venue, genre, date_opens, date_closes, url, created_by_user_id])
  .catch(error => {
  console.error(error.message);
  throw error;
  });
}

module.exports = {
  getAll,
  getById,
  create
};
