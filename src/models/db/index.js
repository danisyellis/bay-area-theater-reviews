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

function getAlbums() {
  return db.any(`
    SELECT * FROM albums`)
  .catch(err => {
    console.log("Error: ", err);
    throw err;
  });
}

function getAlbumsById(albumId) {
  return db.oneOrNone(`
    SELECT * FROM albums
    WHERE id = $1
  `, [albumId])
  .catch(err => {
    console.log("Error: ", err);
    throw err;
  });
}



module.exports = {
  getAlbums,
  getAlbumsById,
};
