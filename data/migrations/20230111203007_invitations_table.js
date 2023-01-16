/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('invites', (table) => {
    table.uuid('id').primary().notNullable()
    table.string('code').notNullable()
    table.timestamp('expiration_date')
    table.timestamp('created_at').notNullable()
    table.boolean('unique').notNullable()
    table.boolean('used')
    table.string('name')
    table.uuid('tournament_id')
    table.foreign('tournament_id').references('tournaments.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('invites')
}
