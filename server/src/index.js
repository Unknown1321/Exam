import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

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

// Set up the static files serving from the public directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Define a route to serve the skills.html file
app.get('/skills', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/pages/skills/skills.html'));
});

// Define your existing route here
app.get('/api/skills', (req, res) => {
  // Example query: SELECT all records from a table
  connection.query('SELECT name, date, description FROM work_experience', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  });
});

// Socket.IO connection logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle socket events here
  // For example, emit a 'chatMessage' event to the frontend
  socket.emit('chatMessage', 'Hello, client!');

  // Listen for a 'chatMessage' event from the frontend
  socket.on('chatMessage', (message) => {
    console.log(`Received message from client: ${message}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



