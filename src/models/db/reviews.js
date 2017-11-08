const {db} = require('./index');

const create = ((review, userId, albumId) => {
  return db.oneOrNone(`
    INSERT INTO reviews (content, user_id, album_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [review, userId, albumId])
  .catch(error => {
  console.error(error.message);
  throw error;
  });
});

const getById = id => {
  return db.oneOrNone(`
    SELECT * FROM reviews
    WHERE id = $1
  `, id)
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

const getByAlbumId = albumId => {
  return db.any(`
    SELECT * FROM reviews
    WHERE album_id = $1
  `, albumId)
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

module.exports = {
  create,
  getById,
  getByAlbumId
};
