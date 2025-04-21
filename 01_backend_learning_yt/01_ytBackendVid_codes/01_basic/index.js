// import express from 'express' //Module js
require("dotenv").config(); // Load environment variables from .env file
const express = require("express"); // CommonJS import for express
const app = express();
// virtual port on our system where its listing everything
const port = process.env.PORT || 3000; // Use port from .env file or default to 3000

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/twitter", (req, res) => {
  res.send("twitter");
});

app.get("/login", (req, res) => {
  res.send("<h1> login  </h1>");
});

// Start the server and listen on the port specified in the .env file or fallback to 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
