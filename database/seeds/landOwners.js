
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('landOwners').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('landOwners').insert([
        {
          name: 'lambdaRvPark',
          landLocation: '2800 Lamda Street, Sunny, CA, 554605',
          description: 'Lambda RV Park is 300 acre park with a dozen amentities.',
          pricePerDay: '65.93',
        },


        {
          name: 'Colney Park',
          landLocation: '2600 Colney Street, Bright, Pa, 8675309',
          description: 'Colney RV Park is 200 acre park with a limited amentities.',
          pricePerDay: '65.93',
        },


      ]);
    });
};
