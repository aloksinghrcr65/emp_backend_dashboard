const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Check if the environment variable MONGODB_URL_LOCAL is defined
if (!process.env.MONGODB_URL_LOCAL) {
    console.error('MongoDB connection URL is not defined. Check your environment variables.');
    process.exit(1);
}

const db_url = process.env.MONGODB_URL_LOCAL;

const connectDB = mongoose.connect(db_url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

module.exports = connectDB;
