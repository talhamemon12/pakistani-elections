const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Voter = require('../models/Voter'); // Import the Voter model
const { connect } = require('../config/db'); // Import the database connection

// Constituency IDs
const constituencies = [
  '6757a95af7a062bed8f46f63', // NA-1 Islamabad
  '6757a95af7a062bed8f46f64', // NA-2 Karachi South
  '6757a95af7a062bed8f46f65', // NA-3 Lahore
];

// Generate sample voters
const votersData = Array.from({ length: 50 }, (_, index) => {
  const cnicPrefix = 12345 + index; // Ensure unique CNIC prefixes
  return {
    cnic: `${cnicPrefix}-1234567-1`, // Unique CNIC
    name: `Voter ${index + 1}`, // Sample voter name
    email: `voter${index + 1}@example.com`, // Unique email
    phone: `0300${(index + 1).toString().padStart(7, '0')}`, // Pakistani phone number format
    address: {
      province: ['Punjab', 'Sindh', 'Balochistan', 'Khyber Pakhtunkhwa', 'Islamabad'][index % 5], // Alternate provinces
      city: ['Islamabad', 'Karachi', 'Lahore'][index % 3], // Alternate cities
      constituency: constituencies[index % 3], // Alternate constituencies
    },
    dateOfBirth: new Date(
        new Date().setFullYear(new Date().getFullYear() - (18 + Math.floor(Math.random() * 20))) // Age between 18 and 38
      ),
    password: 'password123', // Default password
  };
});

// Seed Voters Function
const seedVoters = async () => {
  try {
    console.log('Connecting to database...');
    await connect(); // Connect to the database

    for (let voterData of votersData) {
      // Check if the voter already exists by CNIC
      const existingVoter = await Voter.findOne({ cnic: voterData.cnic });
      if (existingVoter) {
        console.log(`Voter with CNIC ${voterData.cnic} already exists.`);
        continue; // Skip if already exists
      }

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(voterData.password, salt);

      // Create a new voter object with the hashed password
      const voter = new Voter({
        ...voterData,
        password: hashedPassword, // Save the hashed password
      });

      // Save the voter to the database
      await voter.save();
      console.log(`Voter seeded successfully: ${voter.name}`);
    }
  } catch (error) {
    console.error('Error seeding voters:', error);
  } finally {
    mongoose.connection.close(); // Close the database connection after seeding
  }
};

// Run the seeding function
(async () => {
  await seedVoters(); // Seed the voters
})();
