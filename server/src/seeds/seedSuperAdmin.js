const bcrypt = require('bcryptjs'); // For password hashing
const {connect} = require('../config/db'); // Import the connect function
const SuperAdmin = require('../models/SuperAdmin'); // Path to SuperAdmin model

// Connect to the database
connect().then(async () => {
  try {
    // Check if a super admin already exists
    const existingAdmin = await SuperAdmin.findOne({ role: 'superAdmin' });

    if (existingAdmin) {
      console.log('Super admin already exists');
      process.exit(0); // Exit if super admin already exists
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('superadminpassword', 10); // 10 salt rounds

    // Create the super admin document
    const superAdmin = new SuperAdmin({
      name: 'Super Admin',
      email: 'superadmin@example.com',
      phone: '1234567890',
      password: hashedPassword,
      role: 'superAdmin',
      isActive: true,
    });

    // Save the super admin to the database
    await superAdmin.save();
    console.log('Super admin created successfully');
    process.exit(0); // Exit once the super admin is created
  } catch (error) {
    console.error('Error creating super admin:', error);
    process.exit(1); // Exit if there's an error
  }
});
