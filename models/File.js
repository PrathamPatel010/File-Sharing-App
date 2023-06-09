const mongoose = require('mongoose');

const File = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0,
    },
})

mongoose.model('File', File);
module.exports = File;