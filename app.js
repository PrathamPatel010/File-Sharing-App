const express = require('express');
const multer = require('multer');
const path = require('path');

// app initializatinon
const app = express();
const upload = multer({ dest: "uploads" });
app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

// routes
app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, '/views/index.ejs');
    res.render(indexFile);
})

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Hii');
})