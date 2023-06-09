require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const { connectDb } = require('./db');
const File = require('./models/File');

// app initializatinon
const app = express();
const upload = multer({ dest: "uploads" });
app.set('view engine', 'ejs');
connectDb();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})

// routes
app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, '/views/index.ejs');
    res.render(indexFile);
})

app.post('/upload', upload.single('file'), (req, res) => {
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
        password: req.body.password,
        downloadCount: 1
    }
    console.log(fileData);
    res.send('success');
})