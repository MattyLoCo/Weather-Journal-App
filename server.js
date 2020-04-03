// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

// Callback console.log to debug
const server = app.listen(port, () => {
  return console.log(`Listening on port ${port}...`);
});

// GET route
// Callback function to complete GET '/all'
app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};
// POST route
app.post('/', (req, res) => res.send('POST received'));
