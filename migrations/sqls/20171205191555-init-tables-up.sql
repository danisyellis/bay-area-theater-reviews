/* Replace with your SQL commands */

CREATE TYPE category AS ENUM ('musical', 'play', 'improv', 'dance', 'concert', 'immersive', 'comedy', 'variety', 'opera', 'other');

DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id serial primary key,
  name varchar(255) NOT NULL UNIQUE,
  email varchar(100) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  date_joined DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE shows (
  id SERIAL primary key,
  title VARCHAR(255) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  genre CATEGORY,
  date_opens DATE,
  date_closes DATE,
  url VARCHAR(255),
  created_by_user_id INTEGER REFERENCES users (id)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews(
  id serial primary key,
  content text NOT NULL,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id INTEGER REFERENCES users (id),
  show_id INTEGER REFERENCES shows (id)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
