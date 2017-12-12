# Bay-Area-Theater-Reviews

A community for theater enthusiasts in the Bay Area to review their favorite shows.

## Getting Started

Create a .env file and put into it:
1. The port number, probably: `PORT = 3000`
1. The database url, probably: `DATABASE_URL = 'postgres://localhost:5432/${dbName}` where dbName is the name of your db
1. The SECRET for your sessions

### Setting Up Your Database

Use the following commands to set up and seed your database:

1. Create PostgreSQL database called theater_dev by running the command `npm run db:create`
1. Set up database tables by running a migration: `npm run db:migrate`
1. You can also load some really basic seed data by running `npm run db:seedShows`


See the site live at https://bayareatheaterreviews.herokuapp.com/
