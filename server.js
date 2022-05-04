// Setup empty JS object to act as endpoint for all routes
let = projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
// connects our server-side code to our client-side code.
app.use(express.static("website"));

// Setup Server
const port = 8000;
const hostname = "localhost";
const server = app.listen(port, () => {
  console.log(`server is running at http://${hostname}:${port}`);
});

// GET Requests
app.get("/all", (req, res) => {
  res.send(projectData);
  console.log(projectData);
  res.send(projectData);
});

// POST Requests
app.post("/add", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});
