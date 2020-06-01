exports.up = function (knex) {
  return knex.schema
    .createTable('UserCountry', (table) => {
      table.increments('id');
      table.string('name');
      table.string('code');
    })
    .createTable('User', (table) => {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('email').unique();
      table.string('password');
      table.integer('country').unsigned().nullable();
      table.foreign('country').references('UserCountry.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('User').dropTableIfExists('UserCountry');
};
