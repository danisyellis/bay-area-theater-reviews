const pgp = require('pg-promise')();

const dbName = 'vinyl2';
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;
const db = pgp(connectionString);

db.connect()
.then(obj => {
    obj.done(); // success, release the connection;
})
.catch(error => {
    console.log('ERROR:', error.message || error);
});

module.exports = {
  db
};
