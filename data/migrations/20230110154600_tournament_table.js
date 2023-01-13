/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tournaments', (table) => {
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('format')
    table.boolean('open')
    table.string('created_at').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tournaments')
}
