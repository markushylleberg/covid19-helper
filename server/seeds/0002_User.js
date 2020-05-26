exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('User')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert([
        {
          first_name: 'Mads',
          last_name: 'Jakobsen',
          email: 'test@test.dk',
          password: 'thispassworddoesnotwork',
          country: 47,
        },
        {
          first_name: 'Jacopo',
          last_name: 'Fransesco',
          email: 'test@test2.dk',
          password: 'thispassworddoesnotwork',
          country: 82,
        },
        {
          first_name: 'Victoria',
          last_name: 'Hånson',
          email: 'test@test3.dk',
          password: 'thispassworddoesnotwork',
          country: 156,
        },
        {
          first_name: 'Véronique',
          last_name: 'Grivois',
          email: 'test@test4.dk',
          password: 'thispassworddoesnotwork',
          country: 60,
        },
        {
          first_name: 'Luca',
          last_name: 'Lovekin',
          email: 'test@test5.dk',
          password: 'thispassworddoesnotwork',
          country: 9,
        },
        {
          first_name: 'Agnieszka',
          last_name: 'Maciejewska',
          email: 'test@test6.dk',
          password: 'thispassworddoesnotwork',
          country: 131,
        },
        {
          first_name: 'Holly',
          last_name: 'Roberts',
          email: 'test@test7.dk',
          password: 'thispassworddoesnotwork',
          country: 80,
        },
        {
          first_name: 'Coralie',
          last_name: 'Blondlot',
          email: 'test@test8.dk',
          password: 'thispassworddoesnotwork',
          country: 109,
        },
        {
          first_name: 'Anni',
          last_name: 'Lärsen',
          email: 'test@test9.dk',
          password: 'thispassworddoesnotwork',
          country: 122,
        },
        {
          first_name: 'Anthony',
          last_name: 'Wilson',
          email: 'test@test10.dk',
          password: 'thispassworddoesnotwork',
          country: 169,
        },
      ]);
    });
};
