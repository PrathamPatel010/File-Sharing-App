const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected: ${response.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connectDb };