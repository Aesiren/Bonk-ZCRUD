/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('item', table => {
    table.increments('item_id');
    table.integer('user');
    table.foreign('user').references('user.user_id');
    table.string('item_name');
    table.text('description');
    table.integer('quantity');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('item');
};
