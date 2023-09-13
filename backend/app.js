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

// this handler will return file information based on file-id
app.get('/file/:id', async(req, res) => {
    try {
        const fileID = req.params.id;
        const fileInfo = await File.findById(fileID).select('-_id fileSize originalName');

        // case: file not found
        if (!fileInfo) {
            return res.json({ status: 404, message: 'No File Found' });
        }
        res.json(fileInfo);
    } catch (err) {
        console.log(err.message);
    }
})


// this handler will check password and enable user to download file
app.post('/file/:id', async(req, res) => {
    try {
        const fileID = req.params.id;
        const password = req.body.password;

        // case: file not found
        const fileInfo = await File.findById(fileID);
        if (!fileInfo) {
            return res.json({ status: 404, message: 'No file found!!' });
        }

        // case: wrong password entered
        const passCheck = await bcrypt.compare(password, fileInfo.password);
        if (!passCheck) {
            return res.json({ status: 401, message: 'Wrong Password!!' });
        }

        res.download(fileInfo.path, fileInfo.originalName);
    } catch (err) {
        console.log(err);
        res.json(err.message);
    }
});