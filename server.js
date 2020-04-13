//  Setup empty JS object to act as endpoint for all routes
projectData = {};

//  Require Express to run server and routes
const express = require('express');
//  Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
//  Enable pre-flight across-the-board
app.options('*', cors());

//  Initialize the main project folder
app.use(express.static('website'));

//  Setup Server
const port = process.env.PORT || 3000;

//  Callback console.log to debug
const server = app.listen(port, () => {
  return console.log(`Listening on port ${port}...`);
});

//  Configure cors 
app.use (function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Access-Control-Allow-Origin');
  res.header('Access-Control-Allow-Methods','GET','POST','PUT','DELETE','OPTIONS')
  next();
})

//  GET route
app.get('/all', sendData);

//  Callback function to complete GET '/all'
function sendData(request, response, next) {
  return response.send(projectData);
};

//  POST route
app.post('/add', addPost );

//  Callback function to complete POST '/add'
function addPost (req, res, next) {

  // projectData.date = req.body.date;
  // projectData.temp = req.body.temp;
  // projectData.content = req.body.content;

  projectData.push(req.body);

  //  Debug code console test
  console.log(projectData);
  return res.send(req.body);
};