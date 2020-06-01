exports.up = function (knex) {
  return knex.schema.createTable('Thread', (table) => {
    table.increments('id');
    table.string('title');
    table.text('body', 'longtext');
    table.integer('user').unsigned().nullable();
    table.foreign('user').references('User.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Thread');
};
