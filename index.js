const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 3004;

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Watchdogs21',
  database: 'SwiftStartApp1'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the  MySQL database!');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch data
app.get('/api/data', (req, res) => {
  connection.query('SELECT * FROM Users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results); // Send the results to the frontend
  });
});

// Serve index.html as the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'startbootstrap-one-page-wonder-gh-pages', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
