// const knexSnakeCaseMapper = require('objection').knexSnakeCaseMappers;
// const credentials = require('./config/dbcredentials.js');

// const options =
//   process.env.NODE_ENV === 'production'
//     ? {
//         client: 'pg',
//         connection: process.env.DATABASE_URL,
//         searchPath: ['public'],
//       }
//     : {
//         client: 'pg',
//         connection: {
//           host: '127.0.0.1',
//           user: credentials.user,
//           password: credentials.password,
//           database: credentials.database,
//           charset: 'utf8',
//           timezone: 'utc+2',
//         },
//       };

// const knex = require('knex')(options);

// module.exports = knex;

module.exports = {
  // development: {
  //   client: 'pg',
  //   connection: {
  //     host: '127.0.0.1',
  //     user: credentials.user,
  //     password: credentials.password,
  //     database: credentials.database,
  //     charset: 'utf8',
  //     timezone: 'utc+2',
  //   },
  // },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
};

// ...knexSnakeCaseMapper()

// staging: {
//   client: 'postgresql',
//   connection: {
//     database: 'my_db',
//     user: 'username',
//     password: 'password',
//   },
//   pool: {
//     min: 2,
//     max: 10,
//   },
//   migrations: {
//     tableName: 'knex_migrations',
//   },
// },

// production: {
//   client: 'postgresql',
//   connection: {
//     database: 'my_db',
//     user: 'username',
//     password: 'password',
//   },
//   pool: {
//     min: 2,
//     max: 10,
//   },
//   migrations: {
//     tableName: 'knex_migrations',
//   },
// },
// };
