exports.seed = async function(knex) {
  // 1. Clear existing entries
  await knex('rooms').del();

  // 2. Fetch Hotel IDs using the NEW names you just added
  const parisHotel = await knex('hotels').where('name', 'Grand Paris Palace').first();
  const baliHotel = await knex('hotels').where('name', 'Bali Ocean Resort').first();
  const tokyoHotel = await knex('hotels').where('name', 'Tokyo Imperial Hotel').first();
  const maldivesHotel = await knex('hotels').where('name', 'Maldives Overwater Villa').first();

  // Safety Check: If a hotel is missing, log it (helps debugging)
  if (!parisHotel || !baliHotel || !tokyoHotel || !maldivesHotel) {
    console.error("Error: Could not find one of the hotels. Did you run the Hotels seeder?");
    return; 
  }

  // 3. Insert Rooms linked to those Hotels
  await knex('rooms').insert([
    // Rooms for Grand Paris Palace
    {
      hotel_id: parisHotel.id,
      room_type: 'Eiffel View Suite',
      price_per_night: 450.00,
      capacity: 2,
      is_available: true
    },
    {
      hotel_id: parisHotel.id,
      room_type: 'Classic King',
      price_per_night: 299.99,
      capacity: 2,
      is_available: true
    },
    
    // Rooms for Bali Ocean Resort
    {
      hotel_id: baliHotel.id,
      room_type: 'Pool Villa',
      price_per_night: 189.99,
      capacity: 4,
      is_available: true
    },

    // Rooms for Tokyo Imperial
    {
      hotel_id: tokyoHotel.id,
      room_type: 'Imperial Suite',
      price_per_night: 399.99,
      capacity: 2,
      is_available: false // Currently booked
    },

    // Rooms for Maldives Overwater Villa
    {
      hotel_id: maldivesHotel.id,
      room_type: 'Ocean Bungalow',
      price_per_night: 599.99,
      capacity: 2,
      is_available: true
    }
  ]);
};