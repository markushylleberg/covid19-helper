exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ThreadUserLike')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ThreadUserLike').insert([
        { thread: 1, user: 1 },
        { thread: 1, user: 2 },
        { thread: 1, user: 3 },
        { thread: 1, user: 4 },
        { thread: 1, user: 5 },
        { thread: 2, user: 1 },
        { thread: 2, user: 2 },
        { thread: 2, user: 3 },
        { thread: 3, user: 5 },
        { thread: 3, user: 6 },
        { thread: 3, user: 7 },
        { thread: 3, user: 8 },
        { thread: 4, user: 3 },
        { thread: 4, user: 4 },
        { thread: 4, user: 5 },
        { thread: 4, user: 6 },
        { thread: 4, user: 7 },
        { thread: 4, user: 8 },
        { thread: 4, user: 9 },
        { thread: 5, user: 2 },
        { thread: 5, user: 3 },
        { thread: 5, user: 4 },
        { thread: 6, user: 4 },
        { thread: 6, user: 5 },
        { thread: 6, user: 6 },
      ]);
    });
};
