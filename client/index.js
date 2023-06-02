import express from "express";
import { io } from 'socket.io-client';
import path from "path";
import axios from 'axios';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';


// Function to load page content based on the URL
function loadPageContent(url) {
  // Create a virtual DOM environment using jsdom
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  const document = dom.window.document;
  const contentDiv = document.getElementById('content');

  // Remove the existing content
  contentDiv.innerHTML = '';

  // Load the content based on the URL
  fetch(url)
    .then(response => response.text())
    .then(html => {
      // Set the loaded HTML as the content of the #content div
      contentDiv.innerHTML = html;

      // Run any additional JavaScript code specific to the loaded page
      if (url === '/frontpage') {
        // Code specific to the frontpage.html
        // ...
      } else if (url === '/contact') {
        // Code specific to the contact.html
        // ...
      } else if (url === '/skills') {
        // Code specific to the skills.html
        fetchWorkExperienceData(); // Fetch skills data and populate the table
      }
      // Add more conditions for other pages as needed
    })
    .catch(error => {
      console.error('Error loading page content:', error);
    });
}

// Fetch skills data from the API and populate the table
function fetchWorkExperienceData() {
    fetch('/api/skills')
      .then(response => response.json())
      .then(skills => {
        const table = document.querySelector('.work-experience');
        const tbody = table.querySelector('#work-experience');
  
        // Clear the existing table rows
        tbody.innerHTML = '';
  
        // Create a new row for each skill and populate the cells
        skills.forEach(skill => {
          const row = document.createElement('tr');
  
          const nameCell = document.createElement('td');
          nameCell.textContent = skill.name;
          row.appendChild(nameCell);
  
          const dateCell = document.createElement('td');
          dateCell.textContent = skill.date;
          row.appendChild(dateCell);
  
          const descriptionCell = document.createElement('td');
          descriptionCell.textContent = skill.description;
          row.appendChild(descriptionCell);
  
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching skills data:', error);
      });
  }
  

const app = express();
const socket = io('http://localhost:3000'); // Replace with your server URL

app.use(express.static("public"));

/* My Different Pages */

/* My Frontpage Page */
app.get("/frontpage", (req, res) => {
  res.sendFile(path.resolve("public/pages/frontpage/frontpage.html"));
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