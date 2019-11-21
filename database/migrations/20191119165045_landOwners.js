
exports.up = function (knex) {
    return knex.schema
        .createTable('landOwners', landOwners => {
            landOwners.increments();

            landOwners
                .string('owner_id')
            landOwners
                .string('name', 112)
                .notNullable()
                .unique()
            landOwners.string('password', 255).notNullable();

            landOwners
                .text('description', 250)

            landOwners
                .integer('site', 250)
                // .notNullable()
                .unique()

            landOwners
                .string('state', 10)
            landOwners
                .text('address', 10)

            landOwners
                .boolean('has_electicty').defaultTo(false)

            landOwners
                .boolean('has_water').defaultTo(false)

            landOwners
                .boolean('has_toilets').defaultTo(false)

            landOwners
                .integer('price')

            landOwners
                .string('img_url')
        })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('landOwners')
};
