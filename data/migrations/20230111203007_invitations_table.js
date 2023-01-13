/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('invitations', (table) => {
    table.string('id').primary()
    table.string('code').notNullable()
    table.string('expiration_date')
    table.string('created_at').notNullable()
    table.boolean('unique').notNullable()
    table.string('name').notNullable()
    table.string('tournament')
    table.foreign('tournament').references('tournaments.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('invitations')
}
