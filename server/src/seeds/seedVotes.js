const mongoose = require('mongoose');
const Voter = require('../models/Voter'); // Adjust the path as per your file structure
const Election = require('../models/Election');
const Vote = require('../models/Vote'); // Adjust the path as per your file structure

// Database connection
const {connect} = require('../config/db'); // Adjust the path as per your project
connect();

async function seedVotes() {
  try {
    // Fetch all voters and elections
    const voters = await Voter.find();
    const election = await Election.findOne({ title: 'Pakistani General Election 1' });

    if (!election) {
      throw new Error('Election not found.');
    }

    const { candidates, constituencies } = election;

    if (!candidates.length || !constituencies.length) {
      throw new Error('Candidates or constituencies missing in election.');
    }

    const votes = [];

    // Loop through each voter
    for (const voter of voters) {
      // Ensure the voter belongs to the election's constituency
      if (!constituencies.includes(voter.constituency.toString())) {
        continue; // Skip voters not in the election constituency
      }

      // Randomly select a candidate
      const randomCandidate = candidates[Math.floor(Math.random() * candidates.length)];

      // Create a new vote
      const newVote = {
        voter: voter._id,
        candidate: randomCandidate,
        election: election._id,
        uniqueVoteId: `${voter._id}-${randomCandidate}-${election._id}-${Date.now()}`,
        status: 'valid',
      };

      votes.push(newVote);
    }

    // Insert votes into the database
    await Vote.insertMany(votes);

    // Update election with vote counts
    for (const vote of votes) {
      const candidateInfo = election.candidatesInfo.find(
        (info) => info.candidate.toString() === vote.candidate.toString()
      );
      if (candidateInfo) {
        candidateInfo.votes.push(vote._id); // Add vote ID to the candidate
        candidateInfo.noOfVotes += 1; // Increment vote count
      }
    }

    await election.save();

    console.log(`Successfully seeded ${votes.length} votes.`);
  } catch (error) {
    console.error(`Error seeding votes: ${error.message}`);
  } finally {
    mongoose.connection.close();
  }
}

seedVotes();
