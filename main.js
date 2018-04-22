var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  mongoose = require('mongoose'),
  Users = require('./mongo/mongo'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/moneymind');

const oAuth2Server = require('oauth2-server');
const oAuthModel = require('./mongo/oauth_model');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.oauth = new oAuth2Server({
    model: oAuthModel,
});

var routes = require('./routing/routing'); //importing route
routes(app); //register the route

app.listen(port);

console.log('auth server started on: ' + port);
