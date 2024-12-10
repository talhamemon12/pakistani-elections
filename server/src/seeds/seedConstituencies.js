
const dotenv = require('dotenv');
const {connect} = require('../config/db');
const Constituency = require('../models/Constituency');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connect();

// Array of Constituency Data
const constituencies = [
    {
        name: 'NA-1 Peshawar-I',
        province: 'Khyber Pakhtunkhwa',
        constituencyNumber: 'NA-1',
        district: 'Peshawar',
        totalVoters: 350000,
        pollingStations: 300,
        boundaryDetails: 'Urban and rural areas of Peshawar',
        demographicDetails: {
            population: 400000,
            majorEthnicGroups: ['Pashtun'],
            dominantLanguages: ['Pashto', 'Urdu']
        }
    },
    {
        name: 'NA-59 Rawalpindi-III',
        province: 'Punjab',
        constituencyNumber: 'NA-59',
        district: 'Rawalpindi',
        totalVoters: 450000,
        pollingStations: 350,
        boundaryDetails: 'Areas of Rawalpindi city',
        demographicDetails: {
            population: 500000,
            majorEthnicGroups: ['Punjabi', 'Kashmiri'],
            dominantLanguages: ['Punjabi', 'Urdu']
        }
    },
    {
        name: 'NA-120 Lahore-III',
        province: 'Punjab',
        constituencyNumber: 'NA-120',
        district: 'Lahore',
        totalVoters: 480000,
        pollingStations: 400,
        boundaryDetails: 'Central Lahore areas',
        demographicDetails: {
            population: 600000,
            majorEthnicGroups: ['Punjabi'],
            dominantLanguages: ['Punjabi', 'Urdu']
        }
    },
    {
        name: 'NA-247 Karachi South-II',
        province: 'Sindh',
        constituencyNumber: 'NA-247',
        district: 'Karachi',
        totalVoters: 500000,
        pollingStations: 450,
        boundaryDetails: 'South Karachi areas',
        demographicDetails: {
            population: 700000,
            majorEthnicGroups: ['Sindhi', 'Muhajir'],
            dominantLanguages: ['Sindhi', 'Urdu', 'English']
        }
    },
    {
        name: 'NA-265 Quetta-II',
        province: 'Balochistan',
        constituencyNumber: 'NA-265',
        district: 'Quetta',
        totalVoters: 320000,
        pollingStations: 200,
        boundaryDetails: 'Urban Quetta',
        demographicDetails: {
            population: 350000,
            majorEthnicGroups: ['Baloch', 'Pashtun'],
            dominantLanguages: ['Balochi', 'Pashto', 'Urdu']
        }
    },
    {
        name: 'NA-51 Islamabad-II',
        province: 'Islamabad Capital Territory',
        constituencyNumber: 'NA-51',
        district: 'Islamabad',
        totalVoters: 300000,
        pollingStations: 250,
        boundaryDetails: 'Suburban Islamabad',
        demographicDetails: {
            population: 350000,
            majorEthnicGroups: ['Punjabi', 'Pashtun'],
            dominantLanguages: ['Urdu', 'Punjabi']
        }
    },
    {
        name: 'NA-69 Gujrat-II',
        province: 'Punjab',
        constituencyNumber: 'NA-69',
        district: 'Gujrat',
        totalVoters: 370000,
        pollingStations: 310,
        boundaryDetails: 'Rural and urban areas of Gujrat',
        demographicDetails: {
            population: 400000,
            majorEthnicGroups: ['Punjabi'],
            dominantLanguages: ['Punjabi', 'Urdu']
        }
    },
    {
        name: 'NA-118 Nankana Sahib-II',
        province: 'Punjab',
        constituencyNumber: 'NA-118',
        district: 'Nankana Sahib',
        totalVoters: 330000,
        pollingStations: 290,
        boundaryDetails: 'Rural areas of Nankana Sahib',
        demographicDetails: {
            population: 350000,
            majorEthnicGroups: ['Punjabi'],
            dominantLanguages: ['Punjabi', 'Urdu']
        }
    },
    {
        name: 'NA-226 Hyderabad-II',
        province: 'Sindh',
        constituencyNumber: 'NA-226',
        district: 'Hyderabad',
        totalVoters: 410000,
        pollingStations: 360,
        boundaryDetails: 'Urban Hyderabad',
        demographicDetails: {
            population: 450000,
            majorEthnicGroups: ['Sindhi', 'Muhajir'],
            dominantLanguages: ['Sindhi', 'Urdu']
        }
    },
    {
        name: 'NA-45 Kurram-II',
        province: 'Khyber Pakhtunkhwa',
        constituencyNumber: 'NA-45',
        district: 'Kurram',
        totalVoters: 200000,
        pollingStations: 180,
        boundaryDetails: 'Rural and tribal areas of Kurram',
        demographicDetails: {
            population: 250000,
            majorEthnicGroups: ['Pashtun', 'Tribal Groups'],
            dominantLanguages: ['Pashto']
        }
    }
];

// Seed Data
const seedConstituencies = async () => {
    try {
        await Constituency.deleteMany(); // Clear existing data
        await Constituency.insertMany(constituencies); // Insert new data
        console.log('Constituencies seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding constituencies:', error);
        process.exit(1);
    }
};

// Run Seeder
seedConstituencies();
