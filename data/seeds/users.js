/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('users').del()
  // await knex('users').insert();
}

exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.string('id').primary()
    table.string('name').unique().notNullable()
    // table.string('password')
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('user')
}
