exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('ThreadUserComment')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('ThreadUserComment').insert([
        { thread: 1, user: 1, content: 'That is very crazy!' },
        {
          thread: 1,
          user: 2,
          content: 'Yes but your economy is so much better off they ours...',
        },
        {
          thread: 1,
          user: 4,
          content: 'Really crazy that it has turned worse than Italy!',
        },
        { thread: 2, user: 1, content: 'It is so easy. JUST DO IT!' },
        {
          thread: 2,
          user: 3,
          content: 'I Feel like people just does not care anymore :(',
        },
        { thread: 2, user: 9, content: 'Should be law.' },
        { thread: 2, user: 10, content: 'Totally agree!' },
        { thread: 3, user: 9, content: 'Hope he gets better soon!' },
        { thread: 3, user: 7, content: 'Kind of ironic...' },
        { thread: 3, user: 6, content: 'Thanks for sharing!' },
        { thread: 3, user: 5, content: 'Crazy :O' },
        { thread: 4, user: 3, content: 'Yay!' },
        { thread: 4, user: 4, content: 'Congrats <3' },
        {
          thread: 4,
          user: 6,
          content: 'You guys have had it very hard! Happy for you!',
        },
        { thread: 5, user: 3, content: 'Come to sweden and party B-)' },
        { thread: 5, user: 1, content: 'So happy I graduated last year!' },
        { thread: 5, user: 9, content: 'Same here in Norway :-(' },
        { thread: 5, user: 4, content: 'And festivals too... :(' },
        { thread: 6, user: 8, content: 'Thanks!' },
        { thread: 6, user: 2, content: '<3' },
      ]);
    });
};
