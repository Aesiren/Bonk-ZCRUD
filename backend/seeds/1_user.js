/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    { first_name: 'Jason', last_name: 'Anderson', username: 'Neo', password: 'theone' },
    { first_name: 'Evan', last_name: 'Bonk', username: 'Aesiren', password: 'test' }
  ]);
};
