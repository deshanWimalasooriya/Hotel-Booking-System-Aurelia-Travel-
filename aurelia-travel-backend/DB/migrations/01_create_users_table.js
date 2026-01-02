exports.up = function(knex) {
  return knex.schema
    .dropTableIfExists('users') // <--- Removes table if it exists
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('role').defaultTo('user');
      
      table.string('profile_image').nullable();
      table.string('address_line_1').nullable();
      table.string('address_line_2').nullable();
      table.string('address_line_3').nullable();
      table.string('city').nullable();
      table.string('postal_code').nullable();
      table.string('country').nullable();
      
      table.string('card_type').nullable();
      table.string('card_number').nullable();
      table.string('cvv').nullable();
      table.string('expiry_date').nullable();
      
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};