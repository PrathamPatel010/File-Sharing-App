require('dotenv').config();
const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const getDb = async() => {
    try {
        const conn = await mongoose.connect(DB_URL);
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { getDb };