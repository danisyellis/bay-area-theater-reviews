CREATE TYPE category AS ENUM ('musical', 'play', 'improv', 'dance', 'concert', 'immersive', 'comedy', 'variety', 'opera', 'other');

CREATE TABLE shows (
  id SERIAL primary key,
  title VARCHAR(255) NOT NULL,
  theater VARCHAR(255) NOT NULL,
  genre CATEGORY,
  date_opens DATE,
  date_closes DATE
);

DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id serial primary key,
  name varchar(255) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  date_joined DATE NOT NULL DEFAULT CURRENT_DATE
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews(
  id serial primary key,
  content text NOT NULL,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id INTEGER REFERENCES users (id),
  show_id INTEGER REFERENCES shows (id)
);
