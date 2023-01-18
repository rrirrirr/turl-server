/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages_users', (table) => {
    table.uuid('id').primary()
    table.uuid('message_id')
    table.foreign('message_id').references('id').inTable('messages')
    table.uuid('user_id')
    table.foreign('user_id').references('id').inTable('users')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('messages_users')
}
