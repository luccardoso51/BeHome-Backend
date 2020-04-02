exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {title: 'Saúde'},
        {title: 'Ajuda'},
        {title: 'Entretenimento'},
        {title: 'Educação'}
      ]);
    });
};
