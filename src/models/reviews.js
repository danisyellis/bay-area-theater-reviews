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

module.exports = {
  create,
  getById,
  getByAlbumId
};
