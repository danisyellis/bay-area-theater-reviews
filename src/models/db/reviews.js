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
    JOIN users
    ON reviews.user_id = users.id
    WHERE album_id = $1
    ORDER BY reviews.id DESC
  `, albumId)
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

const getByUserId = userId => {
  return db.any(`
    SELECT * FROM albums
    JOIN reviews
    ON reviews.album_id = albums.id
    WHERE user_id = $1
    ORDER BY reviews.id DESC
  `, userId)
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

const find3MostRecent = () => {
  return db.any(`
    SELECT * FROM reviews
    JOIN users
      ON reviews.user_id = users.id
    JOIN albums
      ON reviews.album_id = albums.id
    ORDER BY reviews.id DESC
    LIMIT 3
  `)
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

const destroy = (reviewId) => {
  console.log("review Id =",reviewId);
  return db.none(`
    DELETE from reviews
    WHERE id = $1
  `, [reviewId])
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

module.exports = {
  create,
  getById,
  getByAlbumId,
  getByUserId,
  find3MostRecent,
  destroy
};
