const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./careerCarveAssignment.db');

db.serialize(() => {
  console.log("Creating tables...");
  
  db.run(`CREATE TABLE IF NOT EXISTS mentors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      availability TEXT,
      areas_of_expertise TEXT,
      is_premium BOOLEAN
  )`, (err) => {
      if (err) {
          console.error("Error creating mentors table:", err.message);
      } else {
          console.log("Mentors table created or already exists.");
      }
  });

  db.run(`CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      availability TEXT,
      area_of_interest TEXT
  )`, (err) => {
      if (err) {
          console.error("Error creating students table:", err.message);
      } else {
          console.log("Students table created or already exists.");
      }
  });

  db.run(`CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      mentor_id INTEGER,
      session_date TEXT,
      session_duration INTEGER,
      status TEXT,
      FOREIGN KEY (student_id) REFERENCES students(id),
      FOREIGN KEY (mentor_id) REFERENCES mentors(id)
  )`, (err) => {
      if (err) {
          console.error("Error creating bookings table:", err.message);
      } else {
          console.log("Bookings table created or already exists.");
      }
  });
});

module.exports = db;
