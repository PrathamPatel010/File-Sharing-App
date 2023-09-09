require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const path = require('path');
const { connectDb } = require('./db');
const File = require('./models/File')
const bcrypt = require('bcrypt');

// app initializatinon
const app = express();
const PORT = process.env.PORT || 3000;
// database connection
mongoose.set('strictQuery', false);
connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    });

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const upload = multer({ dest: "uploads" });
app.set('view engine', 'ejs');


// routes
app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, '/views/index.ejs');
    res.render(indexFile);
})

app.post('/upload', upload.single('file'), async(req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const fileSizeInMb = (req.file.size) / 1048576;
    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,
        password: hashedPassword,
        fileSize: `${fileSizeInMb} MB`,
    };
    const file = await File.create(fileData);

    // Progress bar setup
    let uploadedBytes = 0;
    const totalBytes = req.file.size;

    const progressHandler = () => {
        const progress = Math.round((uploadedBytes / totalBytes) * 100);
        // Send progress update to the client
        res.write(JSON.stringify({ progress }));
    };

    req.on('data', (chunk) => {
        uploadedBytes += chunk.length;
        progressHandler();
    });

    req.on('end', () => {
        // Send the final progress update to the client
        res.end(JSON.stringify({ progress: 100 }));
        console.log('Upload complete');
    });
    res.json({ progress: 100, fileLink: `${req.headers.origin}/file/${file.id}`, originalName: fileData.originalName });
})

app.route('/file/:id').get(downloadHandler).post(downloadHandler);

async function downloadHandler(req, res) {
    if (req.body.password == null) {
        res.render('password');
        return;
    }
    const file = await File.findById(req.params.id);
    const passwordOk = await bcrypt.compare(req.body.password, file.password);
    if (!passwordOk) {
        res.render('password', { error: true });
        return;
    }
    file.downloadCount++;
    console.log(file);
    await file.save();
    res.download(file.path, file.originalName);
}