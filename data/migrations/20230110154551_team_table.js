/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('teams', (table) => {
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('created_at').notNullable()
    // table.date
    table.string('tournament')
    table.foreign('tournament').references('id').inTable('tournaments')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('teams')
}
