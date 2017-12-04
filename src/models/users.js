const db = require('./db/users');

const create = (name, email, password) => {
  return db.create(name, email, password);
};

const getById = (id) => {
  return db.getById(id);
};

const getByEmail = (email) => {
  return db.getByEmail(email);
};

const updateProfile = (id, name, email) => {
  return db.updateProfile(id, name, email);
};

module.exports = {
  create,
  getById,
  getByEmail,
  updateProfile
};
