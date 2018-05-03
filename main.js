var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  mongoose = require('mongoose'),
  Users = require('./mongo/mongo'),
  bodyParser = require('body-parser'),
  validator = require('express-validator');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/moneymind');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());

var routes = require('./routing/routing'); //importing route
routes(app); //register the route


app.listen(port);

console.log('auth server started on: ' + port);
