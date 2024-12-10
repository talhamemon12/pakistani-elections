const mongoose = require('mongoose');

// Constituency Schema
const ConstituencySchema = new mongoose.Schema({
    name: { type: String, required: true }, // Constituency name
    province: { type: String, required: true }, // Province where constituency is located
    constituencyNumber: { type: String, required: true, unique: true }, // Unique number for the constituency
    district: { type: String, required: true }, // District to which the constituency belongs
    totalVoters: { type: Number, default: 0 }, // Total number of registered voters in the constituency
    pollingStations: { type: Number, default: 0 }, // Number of polling stations in the constituency
    boundaryDetails: { type: String, default: '' }, // Description of boundary details for the constituency
    demographicDetails: {
        population: { type: Number, required: true }, // Population of the constituency
        majorEthnicGroups: [{ type: String }], // List of major ethnic groups in the constituency
        dominantLanguages: [{ type: String }] // List of dominant languages in the constituency
    },
    createdAt: { type: Date, default: Date.now } // Creation timestamp
});

// Export the Constituency model
module.exports = mongoose.model('Constituency', ConstituencySchema);
