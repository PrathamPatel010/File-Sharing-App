require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const { connectDb } = require('./db');
const File = require('./models/File')
const bcrypt = require('bcrypt');

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

app.post('/upload', upload.single('file'), async(req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
        password: hashedPassword,
    };
    const file = await File.create(fileData);
    console.log(file);
    res.send('success');
})