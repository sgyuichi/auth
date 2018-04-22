'use strict';
var mongoose = require('mongoose'),
  oauth = require('../mongo/oauth_model');


var createUser = function(req, res) {
  oauth.register(req.body, function(user) {
    res.json(user);
  }, function(err) {
    res.send(err);
  });
};

var login = function (registerUserQuery, res) {
  console.log("login");
  console.log(registerUserQuery);
  console.log(res);
  res.send(res);
}

module.exports = {
  createUser: createUser,
  login: login
}
