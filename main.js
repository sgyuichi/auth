const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validator = require('express-validator');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/moneymind');

app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

let routes = require('./routing/routing'); // importing route
routes(app); // register the route


app.listen(port);

console.log('auth server started on: ' + port);
