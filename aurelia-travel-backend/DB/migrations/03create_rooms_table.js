exports.up = function(knex) {
  return knex.schema
    .dropTableIfExists('rooms') // <--- Added this
    .createTable('rooms', (table) => {
      table.increments('id').primary();
      table.integer('hotel_id').unsigned().references('id').inTable('hotels').onDelete('CASCADE');
      table.string('room_type').notNullable();
      table.decimal('price_per_night', 10, 2).notNullable();
      table.integer('capacity').notNullable();
      table.boolean('is_available').defaultTo(true);
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('rooms');
};