// dependencies & imports
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const frontend_base = process.env.FRONTEND_URL;
const app = express();
const cors = require('cors');
const corsOption = {
    origin: frontend_base
}
const multer = require('multer');
const upload = multer({ dest: "uploads" });

// middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app initialization
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

// Home route
app.get('/', (req, res) => {
    res.send('<h1>QuickShare Backend is up & running</h1>');
})

// file will be uploaded to 'uploads' folder first, and then this handler will be called.
app.post('/api/upload', upload.single('file'), async(req, res) => {
    const fileInfo = req.file;
    const { password } = req.body;
    res.json({ message: "Request received", Info: fileInfo, password });
})