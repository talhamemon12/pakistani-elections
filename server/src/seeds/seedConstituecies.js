const { connect } = require('../config/db'); // Adjust the path based on your folder structure
const Constituency = require('../models/Constituency'); // Adjust the path based on your folder structure

// Sample Constituency Data
const constituencies = [
    {
        name: 'NA-1 Islamabad',
        province: 'Islamabad Capital Territory',
        constituencyNumber: 'NA-1',
        district: 'Islamabad',
        totalVoters: 500000,
        pollingStations: 200,
        boundaryDetails: 'Encompasses major urban and rural areas of Islamabad.',
        demographicDetails: {
            population: 1200000,
            majorEthnicGroups: ['Punjabi', 'Pashtun', 'Sindhi'],
            dominantLanguages: ['Urdu', 'English']
        }
    },
    {
        name: 'NA-2 Karachi South',
        province: 'Sindh',
        constituencyNumber: 'NA-2',
        district: 'Karachi South',
        totalVoters: 800000,
        pollingStations: 250,
        boundaryDetails: 'Covers the urban center and coastal areas of Karachi South.',
        demographicDetails: {
            population: 2000000,
            majorEthnicGroups: ['Sindhi', 'Balochi', 'Muhajir'],
            dominantLanguages: ['Sindhi', 'Urdu']
        }
    },
    {
        name: 'NA-3 Lahore',
        province: 'Punjab',
        constituencyNumber: 'NA-3',
        district: 'Lahore',
        totalVoters: 700000,
        pollingStations: 230,
        boundaryDetails: 'Includes the historical and commercial hubs of Lahore.',
        demographicDetails: {
            population: 1800000,
            majorEthnicGroups: ['Punjabi', 'Kashmiri'],
            dominantLanguages: ['Punjabi', 'Urdu']
        }
    },
    {
        name: 'NA-4 Peshawar',
        province: 'Khyber Pakhtunkhwa',
        constituencyNumber: 'NA-4',
        district: 'Peshawar',
        totalVoters: 400000,
        pollingStations: 180,
        boundaryDetails: 'Spans urban and suburban regions of Peshawar.',
        demographicDetails: {
            population: 1000000,
            majorEthnicGroups: ['Pashtun', 'Hindko-speaking'],
            dominantLanguages: ['Pashto', 'Urdu']
        }
    },
    {
        name: 'NA-5 Quetta',
        province: 'Balochistan',
        constituencyNumber: 'NA-5',
        district: 'Quetta',
        totalVoters: 300000,
        pollingStations: 150,
        boundaryDetails: 'Includes urban areas and surrounding rural regions of Quetta.',
        demographicDetails: {
            population: 800000,
            majorEthnicGroups: ['Baloch', 'Pashtun'],
            dominantLanguages: ['Balochi', 'Pashto']
        }
    }
];

// Seed Function
const seedConstituencies = async () => {
    try {
        console.log('Connecting to Database...');
        await connect(); // Use the connect function from db.js
        console.log('Database Connected');

        console.log('Clearing Existing Constituencies...');
        await Constituency.deleteMany(); // Clear previous records
        console.log('Existing Constituencies Removed');

        console.log('Inserting Constituencies...');
        await Constituency.insertMany(constituencies);
        console.log('Constituencies Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

// Run Seeding
seedConstituencies();
