/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tournaments', (table) => {
    table.uuid('id').primary().notNullable()
    table.string('name').notNullable()
    table.text('description')
    table.integer('max_num_teams')

    table.string('format')
    table.foreign('format').references('formats.name')

    table.boolean('open').notNullable()

    table.string('venues')

    table.timestamp('end_date')
    table.timestamp('start_date')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())

    table.string('game_type').notNullable()
    table.foreign('game_type').references('game_types.name')

    table.json('standings')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tournaments')
}
