// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: '.database/dev.sqlite3'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true,
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.sqlite3'
    },
    seeds: {
      directory: './database/seeds'
    },
  },
};
