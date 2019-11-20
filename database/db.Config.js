// const knex = require('knex');

// const knexConfig = require('../knexfile');

// module.exports = knex(knexConfig.development);

const knex = require('knex');

const knexConfig = require('../knexfile');

module.exports = knex(knexConfig.development);