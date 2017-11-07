const db = require('./db/users');

const create = (name, email, password) => {
  return db.create(name, email, password);
};

module.exports = {
  create
};
