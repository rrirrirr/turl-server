/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('result', (table) => {
    table.string('id').primary()
    table.string('points').notNullable()
    table.string('game').notNullable()
    table.foreign('game').references('games.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('result')
}
