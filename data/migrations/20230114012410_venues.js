/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('venues', (table) => {
    table.string('name').primary()
    table.timestamp('start_date').defaultTo(knex.fn.now())
    table.timestamp('end_date').defaultTo(knex.fn.now())
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('venues')
}
