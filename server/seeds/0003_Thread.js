exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Thread')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Thread').insert([
        {
          title: 'Use a mask!',
          body:
            'It has been proved that actually using a mask 24/7 works for avoiding the spread of the virus!',
          user: 1,
        },
        {
          title: 'Wash hands',
          body: 'The more you wash your hands the better.',
          user: 1,
        },
      ]);
    });
};
