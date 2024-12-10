const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
let MONGO_KEY = process.env.MONGO_URI ||"mongodb+srv://talhamemon:gEwASFrrK4wj8FvX@cluster0.h3hzd.mongodb.net/" ; 

const connect = async () => {
    try {
        await mongoose.connect(MONGO_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};

module.exports = { connect };
