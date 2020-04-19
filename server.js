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
// app.options('*', cors({
//   origin:['http://localhost:3000', 'http://192.168.1.24:3000'], 
//   credentials: true
// }));

//  Initialize the main project folder
app.use(express.static('website'));

//  Setup Server
const port = process.env.PORT || 3000;

//  Callback console.log to debug
const server = app.listen(port, () => {
  return console.log(`Express server listening on port ${port}...`);
});

//  Configure cors options
// app.all ('/', function(req, res, next) {

//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods','GET');      
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('optionsSuccessStatus', 200);
//   next();
// })

//  GET route
app.get('/all', sendData );

//  Callback function to complete GET '/all'
function sendData(request, response, next) {
  response.send(projectData);
};

//  POST route
app.post('/add', addPost );

//  Callback function to complete POST '/add'
function addPost (req, res) {
  let newData = req.body;

  let newEntry = {
    date: newData.date,
    temp: newData.temp,
    content: newData.content
  };

  projectData.push(newEntry);

  //  Debug code console test
  console.log(newEntry);
  res.send(newEntry);
};