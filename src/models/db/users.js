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

const getById = id => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE id = $1
  `, id)
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

const getByEmail = (email) => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE email = $1
  `, [email])
  .catch(error => {
  console.error(error.message);
  throw error;
  });
};

const updateProfile = (id, name, email) => {
  return db.oneOrNone(`
    UPDATE users
    SET name=$2, email=$3
    WHERE id=$1
    `, [id, name, email])
    .catch(error => {
      console.error(error.message);
      throw error;
    });
};

module.exports = {
  create,
  getById,
  getByEmail,
  updateProfile
};
