/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages_games', (table) => {
    table.uuid('id').primary()
    table.uuid('message_id')
    table.foreign('message_id').references('id').inTable('messages')
    table.uuid('games_id')
    table.foreign('games_id').references('id').inTable('games')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('messages_games')
}
