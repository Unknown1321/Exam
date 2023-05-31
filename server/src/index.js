const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 3000; // Set your desired port number

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define your routes here
app.get('/', (req, res) => {
  // Example query: SELECT all records from a table
  connection.query('SELECT * FROM cars', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

