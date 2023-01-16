/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('teams', (table) => {
    table.uuid('id').primary().notNullable()
    table.string('name').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.boolean('accepted').notNullable()
    table.integer('seed')
    table.string('team_code').notNullable()
    table.uuid('tournament_id')
    table.foreign('tournament_id').references('id').inTable('tournaments')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('teams')
}
