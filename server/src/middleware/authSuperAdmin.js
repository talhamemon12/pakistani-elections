// src/middleware/authSuperAdmin.js

const jwt = require('jsonwebtoken');
const SuperAdmin = require('../models/SuperAdmin');
require('dotenv').config();

const authSuperAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the super admin exists
    const superAdmin = await SuperAdmin.findById(decoded.id);
    if (!superAdmin) {
      return res.status(401).json({ message: 'SuperAdmin not found' });
    }

    // Add superAdmin data to the request object
    req.superAdmin = superAdmin;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {authSuperAdmin};
