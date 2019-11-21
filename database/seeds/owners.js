
const bcrypt = require('bcryptjs');

exports.seed = function (knex, promise) {
  // Deletes ALL existing entries
  return knex('owners').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('owners').insert([
        { ownername: 'lambdaschool1', password: bcrypt.hashSync('password1') },
        { ownername: 'lambdaschool2', password: bcrypt.hashSync('password2') },
        { ownername: 'lambdaschool3', password: bcrypt.hashSync('password3') }
      ]);
    });
};
