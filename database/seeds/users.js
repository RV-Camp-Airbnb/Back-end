// const bcrypt = require('bcryptjs');


// exports.seed = function (knex, promise) {
//   // Deletes ALL existing entries
//   return knex('users').truncate()

//     .then(function () {
//       // Inserts seed entries
//       return knex('users').insert([
//         { username: 'lambdaschool', password: bcrypt.hashSync('admin', 8) },
//         { username: 'lambdaschool2', password: bcrypt.hashSync('password2', 8) },
//         { username: 'lambdaschool3', password: bcrypt.hashSync('password3', 8) }

//       ]);
//     });
// };

const bcrypt = require('bcryptjs');


exports.seed = function (knex, promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()

    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'lambdaschool', password: bcrypt.hashSync('admin', 8) },
        { username: 'lambdaschool2', password: bcrypt.hashSync('password2', 8) },
        { username: 'lambdaschool3', password: bcrypt.hashSync('password3', 8) }

      ]);
    });
};

