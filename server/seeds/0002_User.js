exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('User')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert([
        {
          first_name: 'Markus',
          last_name: 'Hylleberg',
          email: 'test@test.dk',
          password: 'test',
        },
        {
          first_name: 'Michelle',
          last_name: 'Grassi',
          email: 'test@test2.dk',
          password: 'test',
        },
        {
          first_name: 'Frederik',
          last_name: 'Frost',
          email: 'test@test3.dk',
          password: 'test',
        },
        {
          first_name: 'Christina',
          last_name: 'Høj Nielsen',
          email: 'test@test4.dk',
          password: 'test',
        },
      ]);
    });
};
