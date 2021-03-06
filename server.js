// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, ()=> console.log(`Server is running on localhost:${port}`));

// GET Route
app.get('/all', (req, res) => res.send(projectData));

// POST Route
app.post('/weatherInfo', (req , res) => {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    projectData.city = req.body.city;
    projectData.country = req.body.country;
    console.log('######## POST Server Response ########');
    console.log(projectData);
});