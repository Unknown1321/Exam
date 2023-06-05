import express from "express";
import { io } from 'socket.io-client';
import path from "path";

const app = express();
const socket = io('http://localhost:3000'); // Server URL for socket 

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
