exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ThreadUserPinned')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ThreadUserPinned').insert([
        { thread: 1, user: 1 },
        { thread: 2, user: 1 },
        { thread: 2, user: 1 },
      ]);
    });
};
