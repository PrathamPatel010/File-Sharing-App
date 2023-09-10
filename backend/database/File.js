const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
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
    fileSize: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('File', FileSchema);