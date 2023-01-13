/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('games', (table) => {
    table.string('id').primary()
    table.string('location').notNullable()
    table.string('sheet').notNullable()
    table.string('time').notNullable()
    table.string('tournament')
    table.foreign('tournament').references('tournaments.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('games')
}
