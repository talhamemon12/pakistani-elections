const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin'); // Import the Admin model
const { connect } = require('../config/db'); // Import the database connection
const Constituency = require('../models/Constituency');

// Sample Admin Data with Pakistani names
const adminsData = [
  {
    name: 'Ali Ahmed',
    email: 'ali.ahmed@example.com',
    phone: '03001234567',
    password: 'password123',
    assignedConstituencies: ['6757972e7546015141c45b0c'], // NA-1 Islamabad
  },
  {
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    phone: '03002345678',
    password: 'password123',
    assignedConstituencies: ['6757972e7546015141c45b0d'], // NA-2 Karachi South
  },
  {
    name: 'Ahmed Shah',
    email: 'ahmed.shah@example.com',
    phone: '03003456789',
    password: 'password123',
    assignedConstituencies: ['6757972e7546015141c45b0e'], // NA-3 Lahore
  },
  {
    name: 'Fatima Ali',
    email: 'fatima.ali@example.com',
    phone: '03004567890',
    password: 'password123',
    assignedConstituencies: ['6757972e7546015141c45b0f'], // NA-4 Peshawar
  },
  {
    name: 'Zahid Hussain',
    email: 'zahid.hussain@example.com',
    phone: '03005678901',
    password: 'password123',
    assignedConstituencies: ['6757972e7546015141c45b10'], // NA-5 Quetta
  },
];

// Seed Admin Function
const seedAdmin = async () => {
  try {
    console.log('Connecting to database...');
    await connect(); // Connect to the database

    for (let adminData of adminsData) {
      // Check if the admin already exists by email
      const existingAdmin = await Admin.findOne({ email: adminData.email });
      if (existingAdmin) {
        console.log(`Admin with email ${adminData.email} already exists.`);
        continue; // Skip this admin if already exists
      }

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminData.password, salt);

      // Create a new admin object with the hashed password
      const admin = new Admin({
        ...adminData,
        password: hashedPassword, // Save the hashed password
      });

      // Save the admin to the database
      await admin.save();
      console.log(`Admin seeded successfully: ${admin.name}`);
    }

  } catch (error) {
    console.error('Error seeding admins:', error);
  } finally {
    mongoose.connection.close(); // Close the database connection after seeding
  }
};

// Run the seeding function
(async () => {
  await seedAdmin(); // Seed the admins
})();
