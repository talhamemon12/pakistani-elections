// src/controllers/superAdminProfileController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/SuperAdmin');
require('dotenv').config();

// Login functionality
const Superlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the super admin by email
    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      return res.status(400).json({ message: 'SuperAdmin not found' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Create a JWT token with id and role
    const token = jwt.sign(
      { id: superAdmin._id, role: superAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the token as response
    res.json({
      message: 'Login successful',
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {Superlogin};