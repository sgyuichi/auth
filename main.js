var express = require('express'),
  app = express(),
  port = process.env.PORT || 5555,
  mongoose = require('mongoose'),
  Users = require('./mongo/mongo'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var routes = require('./routing/routing'); //importing route
routes(app); //register the route


app.listen(port);


console.log('auth server started on: ' + port);
