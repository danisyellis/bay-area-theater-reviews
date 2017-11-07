const {db} = require('./index');

const create = ((name, email, password) => {
  return db.oneOrNone(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [name, email, password])
  .catch(error => {
  console.error(error.message);
  throw error;
  });
});

module.exports = {
  create
};
