exports.up = function (knex) {
    return knex.schema.createTable('owners', owners => {
        owners.increments();

        owners
            .string('ownername', 255)
            .notNullable()
            .unique();
        owners.string('password', 255).notNullable();
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('owners');
};