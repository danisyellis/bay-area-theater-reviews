# Bay-Area-Theater-Reviews

A community for theater enthusiasts in the Bay Area to review their favorite shows.

## Getting Started

Create a .env file and put into it:
1. The port number, probably: `PORT = 3000`
1. The database url, probably: `DATABASE_URL = 'postgres://localhost:5432/${dbName}` where dbName is the name of your db
1. The SECRET for your sessions

### Setting Up Your Database

Use the following commands to set up and seed your database:

1. Create PostgreSQL database `vinyl`: `$ npm run db:create`
1. Set up database tables from `schema.sql`: `$ npm run db:schema`
1. Load seed data from `shows.sql`: `$ npm run db:seed`
1. Create a table to store session data: `$npm run db:session:setup`

After this initial setup, you can use the `$npm run db:reset` command to reset your database.


See the site live at https://bayareatheaterreviews.herokuapp.com/
