/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .dropTableIfExists('hotels')
    .createTable('hotels', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('location').notNullable();
      
      // NEW: Added based on your seeder
      table.decimal('price', 10, 2).notNullable(); // Stores values like 299.99
      table.string('amenities'); // Stores "WiFi,Pool,Spa..."
      
      table.text('description');
      table.string('image_url');
      table.integer('rating').defaultTo(0); // Changed to integer to match your seeder (e.g., 5)
      
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('hotels');
};