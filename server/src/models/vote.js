const mongoose = require('mongoose');

// Import necessary models
const Voter = require('./Voter'); // Import the Voter schema
const Candidate = require('./Candidate'); // Import the Candidate schema
const Election = require('./Election'); // Import the Election schema

// Vote Schema
const voteSchema = new mongoose.Schema({
  // Reference to the Voter who cast the vote
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voter', // Reference to the Voter model
    required: true,
  },

  // Reference to the Candidate being voted for
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate', // Reference to the Candidate model
    required: true,
  },

  // Reference to the Election in which the vote is cast
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election', // Reference to the Election model
    required: true,
  },

  // Timestamp of when the vote was cast
  voteTimestamp: {
    type: Date,
    default: Date.now,
  },

  // Status of the vote (valid or invalid)
  status: {
    type: String,
    enum: ['valid', 'invalid'], // Allows only "valid" or "invalid" votes
    default: 'valid', // Default status is valid
  },

  // A unique identifier for each vote
  uniqueVoteId: {
    type: String,
    required: true,
    unique: true, // Ensures each vote has a unique identifier
  },
});

// Pre-save hook to generate a unique vote ID
voteSchema.pre('save', function (next) {
  // If the uniqueVoteId is not already set, generate a unique vote ID
  if (!this.uniqueVoteId) {
    this.uniqueVoteId = `${this.voter}-${this.candidate}-${this.election}-${Date.now()}`;
  }
  next();
});

// Export the schema as a Mongoose model
const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
