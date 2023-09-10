// dependencies & imports
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const frontend_base = process.env.FRONTEND_URL;
const app = express();
const cors = require('cors');
const corsOption = {
    origin: frontend_base,
    credentials: true,
}
const multer = require('multer');
const upload = multer({ dest: "uploads" });
const { getDb } = require('./database/db');
const File = require('./database/File');
const bcrypt = require('bcrypt');

// middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app initialization
const startApp = async() => {
    try {
        await getDb();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    } catch (err) {
        console.log(err.message);
    }
}
startApp();

// Home route
app.get('/', (req, res) => {
    res.send('<h1>QuickShare Backend is up & running</h1>');
})

// file will be uploaded to 'uploads' folder first, and then this handler will be called.
app.post('/api/upload', upload.single('file'), async(req, res) => {
    try {
        // file info will be in req.file
        const fileInfo = req.file;

        // password would be in request body since it's a post request & hashing password
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // formatting data so that it can be inserted directly in database
        const fileData = {
            path: fileInfo.path,
            originalName: fileInfo.originalname,
            password: hashedPassword,
            fileSize: `${fileInfo.size/1048576} MB`,
        }
        const response = await File.create(fileData);
        console.log(response);
        res.json({ message: "File Uploaded", Info: response, link: `${req.headers.origin}/file/${response.id}` });
    } catch (err) {
        console.log(err.message);
        res.json({ message: err.message });
    }
})

app.get('/file/:id', async(req, res) => {
    const fileID = req.params.id;
    const fileInfo = await File.findById(fileID).select('-_id fileSize originalName');
    res.json(fileInfo);
})

app.post('/file/:id', async(req, res) => {
    try {
        const fileID = req.params.id;
        const file = await File.findById(fileID);
        file.downloadCount++;
        console.log(file);
        await file.save();
        res.download(file.path, file.originalName);
    } catch (err) {
        console.log(err);
    }
})