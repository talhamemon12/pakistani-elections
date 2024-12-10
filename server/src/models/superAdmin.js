const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,12}$/, // Phone number validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Enforce strong password policy
  },
  role: {
    type: String,
    default: 'superAdmin', // Defaults to 'superAdmin'
    enum: ['superAdmin'], // Role restricted to 'superAdmin'
  },
  isActive: {
    type: Boolean,
    default: true, // Indicates if the super admin account is active
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update the `updatedAt` field automatically
superAdminSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the schema as a Mongoose model
const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

module.exports = SuperAdmin;
