
const {connect} = require('../config/db'); // Adjust the path based on your folder structure
const Candidate = require('../models/Candidate');

const fetchCandidates = async () => {
    try {
        console.log('Connecting to Database...');
        await connect(); // Use the connect function from db.js
        console.log('Database Connected');

        console.log('Fetching Candidates...');
        const candidates = await Candidate.find(); // Retrieve all candidates
        if (candidates.length === 0) {
            console.log('No candidates found in the database.');
        } else {
            console.log('List of Candidates:');
            candidates.forEach(candidate => {
                console.log(`--------------------------------`);
                console.log(`ID: ${candidate.candidateID}`);
                console.log(`Name: ${candidate.fullName}`);
                console.log(`Party Membership: ${candidate.politicalBackground.partyMembership || 'N/A'}`);
                console.log(`Email: ${candidate.email}`);
                console.log(`Phone Number: ${candidate.phoneNumber}`);
                console.log(`Address: ${candidate.address.street}, ${candidate.address.city}, ${candidate.address.province}`);
                console.log(`--------------------------------`);
            });
        }
        process.exit();
    } catch (error) {
        console.error('Error Fetching Candidates:', error);
        process.exit(1);
    }
};

// Run the Fetching Script
fetchCandidates();
