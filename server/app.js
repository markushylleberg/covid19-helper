const express = require('express');
const session = require('express-session');
const cors = require('cors');
const KnexSessionStore = require('connect-session-knex')(session);

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup the database
const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);

const sessionStore = new KnexSessionStore({
  knex: knex,
  tablename: 'sessions',
});

app.use(
  session({
    secret: 'keyboard cat',
    proxy: true,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000 * 60 * 24,
      secure: false,
    },
    store: sessionStore,
  })
);

// Give the knex instance to objection
Model.knex(knex);

const usersRoute = require('./routes/users.js');
const shiftsRoute = require('./routes/threads.js');

app.use(usersRoute);
app.use(shiftsRoute);

const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
  if (error) {
    console.log('Something went wrong with express.');
  }
  console.log('Server is running on port:', server.address().port);
});
