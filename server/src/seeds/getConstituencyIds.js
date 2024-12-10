const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {connect} = require('../config/db');
const Constituency = require('../models/Constituency');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connect();


const fetchConstituencyIds = async () => {
    try {
        const constituencies = await Constituency.find({}, '_id name'); // Fetch only `_id` and `name`
        console.log('Constituency IDs:');
        constituencies.forEach((c) => {
            console.log(`${c.name}: ${c._id}`);
        });
        process.exit();
    } catch (error) {
        console.error('Error fetching constituency IDs:', error);
        process.exit(1);
    }
};

fetchConstituencyIds();
