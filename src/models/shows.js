const db = require('./db/shows');

const create = (title, venue, genre, date_opens, date_closes, url, created_by_user_id) => {
  return db.create(title, venue, genre, date_opens, date_closes, url, created_by_user_id);
};

const getShowById = (id) => {
  return db.getById(id);
};

const getShows = () => {
  return db.getAll();
};


module.exports = {
  create,
  getShowById,
  getShows
};
