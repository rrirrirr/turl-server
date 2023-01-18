/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages_tournaments', (table) => {
    table.uuid('id').primary()
    table.uuid('message_id')
    table.foreign('message_id').references('id').inTable('messages')
    table.uuid('tournament_id')
    table.foreign('tournament_id').references('id').inTable('tournament')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('messages_tournaments')
}
