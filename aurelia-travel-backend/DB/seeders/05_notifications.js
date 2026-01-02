exports.seed = async function(knex) {
  await knex('notifications').del();

  const testUser = await knex('users').where('username', 'testuser').first();

  if (testUser) {
    await knex('notifications').insert([
      {
        user_id: testUser.id,
        title: 'Booking Confirmed',
        message: 'Your trip to Bali is confirmed!',
        is_read: false
      }
    ]);
  }
};