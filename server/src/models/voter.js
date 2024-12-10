const mongoose = require('mongoose');

// Import Constituency schema
const Constituency = require('./Constituency');

// Voter Schema
const voterSchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/, // Pakistani CNIC format: 12345-1234567-1
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows optional emails while ensuring uniqueness
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,12}$/, // Basic phone number validation (local/overseas)
  },
  address: {
    province: {
      type: String,
      required: true,
      enum: ['Punjab', 'Sindh', 'Balochistan', 'Khyber Pakhtunkhwa', 'Islamabad'],
    },
    city: {
      type: String,
      required: true,
    },
    constituency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Constituency', // Reference to Constituency model
      required: true,
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function (dob) {
        const age = new Date().getFullYear() - dob.getFullYear();
        return age >= 18; // Voter must be at least 18 years old
      },
      message: 'Voter must be at least 18 years old.',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Enforce strong password policy
  },
  verified: {
    type: Boolean,
    default: false, // Becomes true after admin approval
  },
  voted: {
    type: Boolean,
    default: false, // Indicates whether the voter has cast their vote
  },
  twoFactorCode: {
    type: String, // Temporary code sent for 2FA
    required: false, // Can be set when 2FA is needed
  },
  twoFactorCodeExpiration: {
    type: Date, // Expiration time for the 2FA code
    required: false, // Set when the 2FA code is generated
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
voterSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the schema as a Mongoose model
const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
