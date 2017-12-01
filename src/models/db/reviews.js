const {db} = require('./index');

const create = ((review, userId, showId) => {
  return db.oneOrNone(`
    INSERT INTO reviews (content, user_id, show_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [review, userId, showId])
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

const getByShowId = showId => {
  return db.any(`
    SELECT * FROM users
    JOIN reviews
    ON reviews.user_id = users.id
    WHERE show_id = $1
    ORDER BY reviews.id DESC
  `, showId)
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

const getByUserId = userId => {
  return db.any(`
    SELECT * FROM shows
    JOIN reviews
    ON reviews.show_id = shows.id
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
    JOIN shows
      ON reviews.show_id = shows.id
    ORDER BY reviews.id DESC
    LIMIT 3
  `)
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

const destroy = (reviewId) => {
  return db.oneOrNone(`
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
  getByShowId,
  getByUserId,
  find3MostRecent,
  destroy
};
