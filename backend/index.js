const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database'); // Import the database.js to ensure tables are created
const app = express();

// Use the PORT environment variable, or default to 10000
const PORT = process.env.PORT || 10000;

// Bind to 0.0.0.0 so it listens on all network interfaces
const HOST = '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());

// Home Route Welcoming Message
app.get('/', (request, response) => {
    response.json({
        message: "Welcome to CareerCarve Backend Setup..."
    });
});

// Fetching all mentors list
app.get('/mentors', (request, response) => {
    db.all('SELECT * FROM mentors', [], (err, rows) => {
        if (err) {
            response.status(500).json({ error: err.message });
            return;
        }
        response.json(rows);
        console.log("This is the list of mentors");
    });
});

// Fetching all students list
app.get('/students', (request, response) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
        if (err) {
            response.status(500).json({ error: err.message });
            return;
        }
        response.json(rows);
        console.log("This is the list of students");
    });
});

// Creating a new mentor
app.post('/mentors', (request, response) => {
    const { name, availability, areas_of_expertise, is_premium } = request.body;
    const stmt = 'INSERT INTO mentors (name, availability, areas_of_expertise, is_premium) VALUES (?, ?, ?, ?)';
    db.run(stmt, [name, availability, areas_of_expertise, is_premium], function(err) {
        if (err) {
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ mentor_id: this.lastID });
        console.log("Mentor data is inserted successfully...");
    });
});

// Creating a new student
app.post('/students', (request, response) => {
    const { name, availability, area_of_interest } = request.body;
    const stmt = 'INSERT INTO students (name, availability, area_of_interest) VALUES (?, ?, ?)';
    db.run(stmt, [name, availability, area_of_interest], function(err) {
        if (err) {
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ student_id: this.lastID });
        console.log("Student data is inserted successfully...");
    });
});

// Creating a new booking
app.post('/bookings', (request, response) => {
    const { student_id, mentor_id, session_date, session_duration } = request.body;
    const stmt = 'INSERT INTO bookings (student_id, mentor_id, session_date, session_duration, status) VALUES (?, ?, ?, ?, ?)';
    db.run(stmt, [student_id, mentor_id, session_date, session_duration, 'pending'], function(err) {
        if (err) {
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ booking_id: this.lastID });
        console.log("Booking data is inserted successfully...");
    });
});

// Retrieving bookings for a student or a mentor
app.get('/bookings', (request, response) => {
    const { student_id, mentor_id } = request.query;
    let query = 'SELECT * FROM bookings WHERE 1=1';
    const params = [];
    if (student_id) {
        query += ' AND student_id = ?';
        params.push(student_id);
    }
    if (mentor_id) {
        query += ' AND mentor_id = ?';
        params.push(mentor_id);
    }
    db.all(query, params, (err, rows) => {
        if (err) {
            response.status(500).json({ error: err.message });
            return;
        }
        response.json(rows);
        console.log("These are the resultant rows");
    });
});

// Listen to the PORT and bind to 0.0.0.0
app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
