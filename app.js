const express = require('express');


// app initializatinon
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

// routes
app.get('/', (req, res) => {
    res.send('File Sharing app');
})