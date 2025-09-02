/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    { user: 1, item_name: 'phone', description: 'Your one way out. Answer the call', quantity: 1 },
    { user: 2, item_name: 'widget', description: 'Some random object discovered by archeologists digging in a remote area of Mars. No not that area, the other one.', quantity: 100 },
    { user: 2, item_name: 'test item', description: "It's a test object. What description were you expecting?", quantity: 25 }
  ]);
};
