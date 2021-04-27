/**********************************************************
 This is the code for assignment 2 of the express.js course on Academind.
**********************************************************/

// Imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Create app
const app = express();

// Route files
const routing = require('./routes/routing');
const helper = require('./utils/helper');

// App Routing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'utils')));
app.use(routing);

// Create server and listen for port 3000
app.listen(3000);
