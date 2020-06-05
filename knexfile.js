const credentials = require('./server/config/dbcredentials.js');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: credentials.user,
      password: credentials.password,
      database: credentials.database,
      charset: 'utf8',
      timezone: 'utc+2',
    },
    migrations: {
      directory: __dirname + '/server/migrations',
    },
    seeds: {
      directory: __dirname + '/server/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/server/migrations',
    },
    seeds: {
      directory: __dirname + '/server/seeds',
    },
  },
};
