exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ThreadUserLike')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ThreadUserLike').insert([
        { thread: 1, user: 1 },
        { thread: 1, user: 1 },
        { thread: 1, user: 1 },
        { thread: 2, user: 1 },
      ]);
    });
};
