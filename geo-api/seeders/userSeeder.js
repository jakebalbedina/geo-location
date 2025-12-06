const bcrypt = require('bcryptjs');
const db = require('../database');

async function seedUsers() {
  try {
    // Initialize database first
    db.init();
    
    // Wait a bit for table creation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if users already exist
    const existingUsers = await db.all('SELECT * FROM users');
    if (existingUsers && existingUsers.length > 0) {
      console.log('Users already seeded');
      return;
    }

    // Hash passwords
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password456', 10);

    // Insert test users
    await db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      ['admin@example.com', hashedPassword1]
    );

    await db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      ['user@example.com', hashedPassword2]
    );

    console.log('Users seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    console.log('\nAlternative:');
    console.log('Email: user@example.com');
    console.log('Password: password456');
  } catch (error) {
    console.error('Error seeding users:', error.message);
  } finally {
    // Close database connection
    db.close();
  }
}

seedUsers();
