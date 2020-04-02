exports.up = function(knex) {
  return knex.schema.createTable('categories_posts', function(table) {
    table.increments('id').primary();
    
    table.integer('categorie_id').notNullable();
    table.integer('post_id').notNullable();

    table.foreign('categorie_id').references('id').inTable('categories');
    table.foreign('post_id').references('id').inTable('posts');
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories_posts');
};