const express = require('express');
const app = express();
const router = require('./routes/index');
const bodyParser = require('body-parser')
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

// Body parser necessary to read form data
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(router);

app.listen(3000);