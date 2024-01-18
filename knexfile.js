// knexfile.js

module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'bd_softex',
      },
      migrations: {
        directory: './migrations',
      },
      seeds: {
        directory: './seeds',
      },
    },
  };
  