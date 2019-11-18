const bcrypt = require('bcryptjs');


exports.seed = function (knex, promise) {
  // Deletes ALL existing entries
  return knex('users').del()

    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'lambdaschool', password: bcrypt.hashSync('admin', 12) },
        { username: 'lambdaschool2', password: bcrypt.hashSync('password2', 12) },
        { username: 'lambdaschool3', password: bcrypt.hashSync('password3', 12) }

      ]);
    });
};
