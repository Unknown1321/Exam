import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import nodemailer from 'nodemailer';

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

// Enable CORS
app.use(cors());

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

// Handle sending email
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/sendEmail', (req, res) => {
  const { Name, Email, Subject, Message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arenstorffenterprise@gmail.com',
      pass: ''
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: Subject,
    text: `Name: ${Name}\nEmail: ${Email}\nMessage: ${Message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.send('Error');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });
});

// Socket.IO connection logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


