const jwt = require('jsonwebtoken');
const Election = require('../models/Election');
const Candidate = require('../models/Candidate'); 
const Voter = require('../models/Voter');
const Vote = require('../models/Vote');
const mongoose = require('mongoose');


// Function to fetch election details for a voter's constituency
const getElectionDetails = async (req, res) => { 
  try {
    // Extract the JWT from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access token is missing or invalid.' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const voterId = decoded.id; // Assumes JWT contains voter ID as `id`

    // Retrieve voter details (read-only)
    const voter = await Voter.findById(voterId).populate('address.constituency');
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found.' });
    }

    // Get the constituency ID from the voter's address
    const constituencyId = voter.address.constituency._id;

    // Retrieve election details for the voter's constituency (read-only)
    const election = await Election.findOne({ constituencies: constituencyId })
      .populate('admin', 'username email') // Populate admin details
      .populate('candidates') // Populate candidate details
      .populate({
        path: 'candidatesInfo.candidate',
        populate: [
          { path: 'spouse', select: 'name occupation' },
          { path: 'children', select: 'name occupation' },
          { path: 'socialMediaLinks', select: 'twitter facebook instagram linkedIn' },
        ],
      }) // Populate candidate's detailed info
      .populate({
        path: 'candidatesInfo.votes',
        populate: { path: 'voter', select: 'name cnic address' }, // Fix: Populate voter field in votes
      })
      .exec();

    if (!election) {
      return res.status(404).json({ message: 'No election found for your constituency.' });
    }

    // Return election details with full candidate and voter details
    return res.status(200).json({
      election: {
        title: election.title,
        date: election.date,
        status: election.status,
        admin: election.admin,
        constituency: voter.address.constituency.name,
        candidates: election.candidates.map((candidate) => ({
          id: candidate._id,
          fullName: candidate.fullName,
          gender: candidate.gender,
          dateOfBirth: candidate.dateOfBirth,
          placeOfBirth: candidate.placeOfBirth,
          partyMembership: candidate.politicalBackground?.partyMembership || 'N/A',
        })),
        candidatesInfo: election.candidatesInfo.map((info) => ({
          candidate: {
            id: info.candidate._id,
            fullName: info.candidate.fullName,
          },
          noOfVotes: info.noOfVotes,
          votes: info.votes.map((vote) => ({
            voterId: vote.voter._id, // Fix: Reference the correct 'voter' field
            voterName: vote.voter.name,
            voterCnic: vote.voter.cnic,
            voterAddress: vote.voter.address,
            createdAt: vote.voteTimestamp, // Change to voteTimestamp (if required)
          })),
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching election details:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


// Function to get complete details of a candidate by ID
const getCandidateDetails = async (req, res) => {
  try {
    // Extract candidate ID from the request body
    const { candidateId } = req.body;

    if (!candidateId) {
      return res.status(400).json({ message: 'Candidate ID is required.' });
    }

    // Fetch the candidate details from the database
    const candidate = await Candidate.findOne({ _id: candidateId })
      .populate('spouse') // Populate spouse details if it's a reference (optional)
      .populate('children') // Populate children details if they are references
      .populate('familyBackground.siblings') // Populate sibling details
      .populate('address') // Populate address details if it's a reference
      .populate('education.academicAchievements') // Populate academic achievements
      .populate('politicalBackground.politicalPositionsHeld') // Populate political positions
      .populate('legalAndCriminalBackground.courtCases') // Populate legal cases
      .exec();

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    // Return candidate details
    return res.status(200).json({
      message: 'Candidate details retrieved successfully.',
      candidate,
    });
  } catch (error) {
    console.error('Error fetching candidate details:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const castVote = async (req, res) => {
  try {
    // Extract user ID from JWT token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const voterId = decodedToken.id;
console.log("VOTER ID"+voterId)
    // Find the voter
    const voter = await Voter.findById(voterId).populate('address.constituency');
    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }
    // Check if voter has already voted
    if (voter.voted) {
      return res.status(403).json({ message: "Voter has already cast their vote" });
    }

    // Validate the voter's constituency
    const voterConstituency = voter.address.constituency;
    if (!voterConstituency) {
      return res.status(400).json({ message: "Voter's constituency information is missing or invalid" });
    }
    console.log("ID: "+voterConstituency._id)
    // Find the election for the voter's constituency
    const election = await Election.findOne({
      status: 'Ongoing',
      constituencies: voterConstituency._id,  // Ensuring it's ObjectId comparison
    })
      .populate({
        path: 'candidatesInfo.candidate',
        model: 'Candidate'
      });
      
    if (!election) {
      return res.status(404).json({ message: `No ongoing election found for your constituency: ${voterConstituency.name}` });
    }
    
    // Validate the candidate in the election
    const { candidateId } = req.body;
    if (!candidateId) {
      return res.status(400).json({ message: "Candidate ID is required" });
    }
   
    const candidateInfo = election.candidatesInfo.find(info => info.candidate._id.toString() === candidateId);
    if (!candidateInfo) {
      return res.status(404).json({ message: "Candidate not found in this election" });
    }

    // Create a new vote
    const newVote = await Vote.create({
      voter: voter._id,
      candidate: candidateId,
      election: election._id,
      uniqueVoteId: `${voter._id}-${candidateId}-${Date.now()}`, // Generate uniqueVoteId
    });

    // Add vote to candidate and update vote count
    candidateInfo.votes.push(newVote._id);
    candidateInfo.noOfVotes++;
    await election.save();

    // Mark voter as voted
    voter.voted = true;
    await voter.save();

    res.status(200).json({
      message: "Vote cast successfully",
      vote: newVote,
      election: election.title,
      constituency: voterConstituency.name,
      candidate: candidateInfo.candidate.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while casting the vote", error: error.message });
  }
};


module.exports = { getElectionDetails, getCandidateDetails, castVote };
