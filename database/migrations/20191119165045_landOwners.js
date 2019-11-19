
exports.up = function (knex) {
    return knex.schema.createTable('landOwners', landOwners => {
        landOwners.increments();

        landOwners
            .string('name', 112)
            .notNullable()
            .unique()

        landOwners
            .string('landLocation', 250)
            .notNullable()
            .unique()

        landOwners
            .string('description', 250)
            .unique()

        landOwners
            .integer('pricePerDay', 10)
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('landOwners')
};
