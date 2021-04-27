// Import path for ease in routing
const path = require('path');

// Import express js
const express = require('express');

// My Imports
const rootDir = require('../utils/path');


// Create the router object
const router = express.Router();

// found under /admin/add-product due to use statement in app.js uses get method
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

// found under /admin/add-product due to use statement in app.js uses post method
router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;