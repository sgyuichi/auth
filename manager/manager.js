'use strict';
var mongoose = require('mongoose'),
  mongo = require('../mongo/mongo');


var createUser = function(req, res) {
  mongo.insertUser(req.body, function(user) {
    res.json(user);
  }, function(err) {
    res.send(err);
  });
};

module.exports = {
  createUser: createUser
}
