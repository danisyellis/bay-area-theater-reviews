const pgp = require('pg-promise')();

const dbName = 'vinyl2';
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;
const db = pgp(connectionString);

db.connect()
.then(obj => {
    obj.done(); // success, release the connection;
})
.catch(error => {
    console.log('ERROR:', error.message || error);
});

function getShows() {
  return db.any(`
    SELECT * FROM shows`)
  .catch(err => {
    console.log("Error: ", err);
    throw err;
  });
}

function getShowById(showId) {
  return db.oneOrNone(`
    SELECT * FROM shows
    WHERE id = $1
  `, [showId])
  .catch(err => {
    console.log("Error: ", err);
    throw err;
  });
}



module.exports = {
  getShows,
  getShowById,
  db
};
