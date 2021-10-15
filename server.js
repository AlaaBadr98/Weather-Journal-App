/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routesnpm
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));
const port = 3000;;
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on port: ${port}`);
};

//GET route that returns the projectData object
app.get('/getData', sendData)
function sendData (request, response) {
    response.send(projectData)
}

// POST route
app.post('/postData', addData)
function addData(request, response) {
    projectData = request.body;
    response.end();
}

