import express from "express";
import { io } from 'socket.io-client';
import path from "path";

const app = express();
const socket = io('http://localhost:3000'); // Replace with your server URL

app.use(express.static("public"));

/* My Different Pages */

/* My Frontpage Page */
app.get("/frontpage", (req, res) => {
  res.sendFile(path.resolve("public/pages/frontpage/frontpage.html"));
});

app.get("/frontpagenew", (req, res) => {
  res.sendFile(path.resolve("public/pages/frontpage/frontnew.html"));
});

/* My Contact Page */
app.get("/contact", (req, res) => {
  res.sendFile(path.resolve("public/pages/contact/contact.html"));
});

/* Skills Page */
app.get("/skills", (req, res) => {
  res.sendFile(path.resolve("public/pages/skills/skills.html"));
});

/* Projects Page */
app.get("/projects", (req, res) => {
  res.sendFile(path.resolve("public/pages/projects/projects.html"));
});

/* Login Page */
app.get("/login", (req, res) => {
  res.sendFile(path.resolve("public/pages/login/login.html"));
});

/* Sign up Page */
app.get("/sign", (req, res) => {
  res.sendFile(path.resolve("public/pages/signup/sign.html"));
});

const PORT = 5000;

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Server is running on port ", PORT);
});



// Add event listeners to the navbar links
socket.on('connect', () => {
  const navbarLinks = ['/frontpage', '/skills', '/projects', '/contact', '/login', '/sign'];
  navbarLinks.forEach(link => {
    socket.on(link, () => {
      const url = `/${link}`;
      loadPageContent(url);
    });
  });
});











/* // Route to get a specific car by ID
app.get('/cars/:id', (req, res) => {
  const carId = req.params.id;
  // Example query: SELECT a specific car by ID
  connection.query('SELECT * FROM cars WHERE id = ?', [carId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }
    res.json(result[0]);
  });
});

// Route to add a new car
app.post('/cars', (req, res) => {
  // Extract car data from the request body
  const { make, model, year } = req.body;
  // Example query: INSERT a new car into the cars table
  connection.query(
    'INSERT INTO cars (make, model, year) VALUES (?, ?, ?)',
    [make, model, year],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error executing query' });
        return;
      }
      res.status(201).json({ message: 'Car added successfully', carId: result.insertId });
    }
  );
});*/