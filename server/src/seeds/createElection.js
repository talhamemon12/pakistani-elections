const mongoose = require('mongoose');
const { connect } = require('../config/db');
const Election = require('../models/Election');
const Candidate = require('../models/Candidate');
const Constituency = require('../models/Constituency');

// Admins and their assigned constituencies
const admins = [
    { id: "6757aaeccb656b4e9a70d6a8", constituency: "6757a95af7a062bed8f46f63" }, // Ali Ahmed
    { id: "6757aaedcb656b4e9a70d6ab", constituency: "6757a95af7a062bed8f46f64" }, // Ayesha Khan
    { id: "6757aaedcb656b4e9a70d6ae", constituency: "6757a95af7a062bed8f46f65" }  // Ahmed Shah
];

// Candidate groups
const candidateGroups = [
    [
        "6757a9693df5b2d7c2ab9153",
        "6757a9693df5b2d7c2ab9159",
        "6757a9693df5b2d7c2ab915f",
        "6757a9693df5b2d7c2ab9165",
        "6757a9693df5b2d7c2ab9169"
    ],
    [
        "6757a9693df5b2d7c2ab916f",
        "6757a9693df5b2d7c2ab9175",
        "6757a9693df5b2d7c2ab9179",
        "6757a9693df5b2d7c2ab917f",
        "6757a9693df5b2d7c2ab9183"
    ],
    [
        "6757a9693df5b2d7c2ab9189",
        "6757a9693df5b2d7c2ab918d",
        "6757a9693df5b2d7c2ab9193",
        "6757a9693df5b2d7c2ab9199",
        "6757a9693df5b2d7c2ab919d"
    ]
];

// Create Elections
const createElections = async () => {
    try {
        console.log('Connecting to Database...');
        await connect();
        console.log('Database Connected');

        for (let i = 0; i < admins.length; i++) {
            const { id: adminId, constituency: constituencyId } = admins[i];
            const candidates = await Candidate.find({
                _id: { $in: candidateGroups[i] }
            });

            if (candidates.length !== 5) {
                console.log(`Election ${i + 1}: Missing candidates`);
                continue;
            }

            const constituency = await Constituency.findById(constituencyId);
            if (!constituency) {
                console.log(`Election ${i + 1}: Constituency not found`);
                continue;
            }

            const candidatesInfo = candidates.map(candidate => ({
                candidate: candidate._id,
                votes: [],
                noOfVotes: 0
            }));

            const election = new Election({
                title: `Pakistani General Election ${i + 1}`,
                date: new Date(`2024-01-${i + 1}`), // Unique date for each election
                candidates: candidates.map(candidate => candidate._id),
                constituencies: [constituency._id],
                candidatesInfo,
                status: 'Ongoing' // Adjust as necessary
            });

            await election.save();
            console.log(`Election ${i + 1} created successfully:`, election);
        }
        console.log('All elections created successfully.');
        process.exit();
    } catch (error) {
        console.error('Error creating elections:', error);
        process.exit(1);
    }
};

createElections();
