/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tournament_admins', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id')
    table.foreign('user_id').references('id').inTable('users')
    table.uuid('tournament_id')
    table.foreign('tournament_id').references('id').inTable('tournaments')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tournament_admins')
}
