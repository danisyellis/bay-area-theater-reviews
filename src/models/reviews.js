const db = require('./db/reviews');

const create = (name, email, password) => {
  return db.create(name, email, password);
};

const getById = (id) => {
  return db.getById(id);
};

const getByShowId = (showId) => {
  return db.getByShowId(showId);
};

const getByUserId = (userId) => {
  return db.getByUserId(userId);
};

const find3MostRecent = () => {
  return db.find3MostRecent();
};

const destroy = (reviewId) => {
  return db.destroy(reviewId);
};

module.exports = {
  create,
  getById,
  getByShowId,
  getByUserId,
  find3MostRecent,
  destroy
};
