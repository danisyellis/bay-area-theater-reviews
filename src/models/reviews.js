const db = require('./db/reviews');

const create = (name, email, password) => {
  return db.create(name, email, password);
};

const getById = (id) => {
  return db.getById(id);
};

const getByAlbumId = (albumId) => {
  return db.getByAlbumId(albumId);
};

const getByUserId = (albumId) => {
  return db.getByUserId(albumId);
};

const find3MostRecent = () => {
  return db.find3MostRecent();
};

module.exports = {
  create,
  getById,
  getByAlbumId,
  getByUserId,
  find3MostRecent
};
