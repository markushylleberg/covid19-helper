exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ThreadUserComment')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ThreadUserComment').insert([
        { thread: 1, user: 1, content: 'This is a comment' },
        { thread: 2, user: 1, content: 'This is another comment' },
        { thread: 1, user: 2, content: 'This is a good idea!' },
        { thread: 1, user: 2, content: 'I mean... WOW!! genius!' },
        { thread: 2, user: 2, content: 'Ye well obviously..' },
        { thread: 1, user: 3, content: 'HELL YA BOI..' },
        { thread: 2, user: 3, content: 'LUV IT' },
        { thread: 1, user: 4, content: '<33333 luv u guys' },
        { thread: 2, user: 4, content: '<33333 ;))))' },
      ]);
    });
};
