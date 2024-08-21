const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Backend..."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})