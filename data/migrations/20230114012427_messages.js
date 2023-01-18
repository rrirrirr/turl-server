/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.uuid('id').primary().notNullable()
    table.text('text').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('time')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('messages')
}
