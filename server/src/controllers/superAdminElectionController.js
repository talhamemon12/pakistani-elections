const mongoose = require('mongoose');
const Election = require('../models/Election'); // Election schema reference

/**
 * Initiate a new election
 * @param {Object} req - Request object containing election data
 * @param {Object} res - Response object
 */
const initiateElection = async (req, res) => {
    try {
        // Extract election details from the request body
        const { title, constituencies, status } = req.body;

        // Validate mandatory fields
        if (!title || !constituencies || !status) {
            return res.status(400).json({ error: "Title, constituencies, and status are required." });
        }

        // Create a new Election document
        const newElection = new Election({
            title,
            date: Date.now(), // Set the current date and time
            constituencies,
            status, // Status taken from the request body
        });

        // Save the Election to the database
        const savedElection = await newElection.save();

        // Send success response
        res.status(201).json({
            message: "Election initiated successfully.",
            election: savedElection,
        });
    } catch (error) {
        console.error("Error initiating election:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const updateElection = async (req, res) => {
    try {
        const { _id, status, title, constituencies } = req.body;

        // Validate _id
        if (!_id) {
            return res.status(400).json({ error: "Election ID (_id) is required." });
        }

        // Find the election by ID
        const election = await Election.findById(_id);
        if (!election) {
            return res.status(404).json({ error: "Election not found." });
        }

        // Update fields if they are present in the request body
        if (status) election.status = status;
        if (title) election.title = title;
        if (constituencies) election.constituencies = constituencies;

        // Save the updated election
        const updatedElection = await election.save();

        res.status(200).json({
            message: "Election updated successfully.",
            election: updatedElection,
        });
    } catch (error) {
        console.error("Error updating election:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

/**
 * Delete an election
 * @param {Object} req - Request object containing election _id
 * @param {Object} res - Response object
 */
const deleteElection = async (req, res) => {
    try {
        const { _id } = req.body;

        // Validate _id
        if (!_id) {
            return res.status(400).json({ error: "Election ID (_id) is required." });
        }

        // Find and delete the election by ID
        const deletedElection = await Election.findByIdAndDelete(_id);
        if (!deletedElection) {
            return res.status(404).json({ error: "Election not found." });
        }

        res.status(200).json({
            message: "Election deleted successfully.",
            election: deletedElection,
        });
    } catch (error) {
        console.error("Error deleting election:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const addCandidateToElection = async (req, res) => {
    try {
        const { electionId, candidateId } = req.body;

        // Validate input
        if (!electionId || !candidateId) {
            return res.status(400).json({ error: "Election ID and Candidate ID are required." });
        }

        // Find election
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ error: "Election not found." });
        }

        // Check if candidate already exists
        if (election.candidates.includes(candidateId)) {
            return res.status(400).json({ error: "Candidate already exists in this election." });
        }

        // Add candidate
        election.candidates.push(candidateId);
        await election.save();

        res.status(200).json({
            message: "Candidate added successfully to the election.",
            election,
        });
    } catch (error) {
        console.error("Error adding candidate to election:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

/**
 * Remove a candidate from an election
 * @param {Object} req - Request object containing election _id and candidate _id
 * @param {Object} res - Response object
 */
const removeCandidateFromElection = async (req, res) => {
    try {
        const { electionId, candidateId } = req.body;

        // Validate input
        if (!electionId || !candidateId) {
            return res.status(400).json({ error: "Election ID and Candidate ID are required." });
        }

        // Find election
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ error: "Election not found." });
        }

        // Check if candidate exists
        if (!election.candidates.includes(candidateId)) {
            return res.status(400).json({ error: "Candidate not found in this election." });
        }

        // Remove candidate
        election.candidates = election.candidates.filter(
            (candidate) => candidate.toString() !== candidateId
        );
        await election.save();

        res.status(200).json({
            message: "Candidate removed successfully from the election.",
            election,
        });
    } catch (error) {
        console.error("Error removing candidate from election:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

/**
 * Assign an admin to an election
 * @param {Object} req - Request object containing election _id and admin _id
 * @param {Object} res - Response object
 */
const assignAdminToElection = async (req, res) => {
    try {
        const { electionId, adminId } = req.body;

        // Validate input
        if (!electionId || !adminId) {
            return res.status(400).json({ error: "Election ID and Admin ID are required." });
        }

        // Find election
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ error: "Election not found." });
        }

        // Assign admin
        election.admin = adminId;
        await election.save();

        res.status(200).json({
            message: "Admin assigned successfully to the election.",
            election,
        });
    } catch (error) {
        console.error("Error assigning admin to election:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const deassignAdminFromElection = async (req, res) => {
    try {
        const { electionId } = req.body;

        // Validate input
        if (!electionId) {
            return res.status(400).json({ error: "Election ID is required." });
        }

        // Find election
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ error: "Election not found." });
        }

        // Deassign admin
        election.admin = null;
        await election.save();

        res.status(200).json({
            message: "Admin deassigned successfully from the election.",
            election,
        });
    } catch (error) {
        console.error("Error deassigning admin from election:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};

const generateElectionReports = async (req, res) => {
    try {
        // Fetch all elections
        const elections = await Election.find({})
            .populate({
                path: 'candidatesInfo.candidate',
                select: 'name party',
            })
            .populate('admin', 'name email');

        if (!elections.length) {
            return res.status(404).json({ message: 'No elections found.' });
        }

        // Generate detailed reports
        const reports = elections.map(election => {
            // Calculate total votes and find the leading candidate
            let totalVotes = 0;
            let leadingCandidate = null;

            election.candidatesInfo.forEach(candidateInfo => {
                totalVotes += candidateInfo.noOfVotes;

                if (!leadingCandidate || candidateInfo.noOfVotes > leadingCandidate.noOfVotes) {
                    leadingCandidate = {
                        candidate: candidateInfo.candidate,
                        noOfVotes: candidateInfo.noOfVotes,
                    };
                }
            });

            return {
                electionTitle: election.title,
                electionDate: election.date,
                status: election.status,
                admin: election.admin,
                totalVotes,
                leadingCandidate: leadingCandidate
                    ? {
                          name: leadingCandidate.candidate.name,
                          party: leadingCandidate.candidate.party,
                          votes: leadingCandidate.noOfVotes,
                      }
                    : null,
                candidates: election.candidatesInfo.map(info => ({
                    name: info.candidate.name,
                    party: info.candidate.party,
                    votes: info.noOfVotes,
                })),
            };
        });

        res.status(200).json({ message: 'Election reports generated successfully.', reports });
    } catch (error) {
        console.error('Error generating election reports:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { initiateElection,updateElection,deleteElection, addCandidateToElection,removeCandidateFromElection,assignAdminToElection, deassignAdminFromElection, generateElectionReports };
