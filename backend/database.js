const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./careerCarveAssignment.db');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS mentors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      availability TEXT,
      areas_of_expertise TEXT,
      is_premium BOOLEAN
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      availability TEXT,
      area_of_interest TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      mentor_id INTEGER,
      session_date TEXT,
      session_duration INTEGER,
      status TEXT,
      FOREIGN KEY (student_id) REFERENCES students(id),
      FOREIGN KEY (mentor_id) REFERENCES mentors(id)
  )`);
});

module.exports = db;
