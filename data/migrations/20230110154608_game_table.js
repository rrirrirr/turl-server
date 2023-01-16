/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('games', (table) => {
    table.uuid('id').primary().notNullable()
    table.string('name')
    table.string('court').notNullable()
    table.timestamp('start_time')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.json('result')
    table.uuid('venue')
    table.foreign('venue').references('venues.name')
    table.uuid('tournament_id')
    table.foreign('tournament_id').references('tournaments.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('games')
}
