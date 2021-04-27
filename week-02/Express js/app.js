// Node Imports
const path = require('path');

// Third Party Imports
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

/**********************************************************
 Intro Middleware.
**********************************************************/
// // My first middleware!
// app.use((req, res, next) => {
//   console.log(`A request arrived for URL ${req.url}
//   The next function will send a response.`);
//   next();
// });

// // My second middleware!
// app.use((req, res, next) => {
//   res.send(`<h1>Welcome wanderer</h1>
//   <p>Your journey has just begun</p>`);
// });

/**********************************************************
 Basic Routing
**********************************************************/
// app.use('/users', (req, res, next) => {
//   console.log("This is the users page.");
//   res.send(`<h1>Welcome Users</h1>
//   <p>Registered Users:</p>
//   <ol>
//     <li>Partum</li>
//     <li>Parsival</li>
//     <li>Artemis</li>
//   </ol>`);
// });

// app.use('/', (req, res, next) => {
//   console.log("This is the root of the website.");
//   res.send('<p>Welcome to the home page!</p>');
// });

/**********************************************************
Routing with other files
**********************************************************/
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// Filters to routes can be added as the first argument
// app.use(adminRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
 res.status(404).sendFile(path.join(__dirname, 'views','404.html'))
});

app.listen(3000);