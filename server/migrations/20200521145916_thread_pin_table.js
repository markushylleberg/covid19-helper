exports.up = function (knex) {
  return knex.schema.createTable('ThreadUserPinned', (table) => {
    table.increments('id');
    table.integer('thread').unsigned();
    table.foreign('thread').references('Thread.id');
    table.integer('user').unsigned();
    table.foreign('user').references('User.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('ThreadUserPinned');
};
