exports.up = function(knex) {
  return knex.schema.createTable('posts', function(table) {
    table.increments().primary();

    table.string('title').notNullable().defaultTo('');
    table.string('description').notNullable().defaultTo('');
    table.string('content_url').notNullable();
    table.string('img_url').notNullable();
    table.integer('likes').notNullable().defaultTo(0);
    table.integer('dislikes').notNullable().defaultTo(0);
    table.timestamps(true, true);

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts');
};