'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  _id: {
    type: String,
  },
  password: {
    type: String,
  }
});

var UserModel = mongoose.model('users', User);
var insertUser = function(userPostRequest, cb, cbErr) {
    var user = new userModel(userPostRequest);
    user.save(function(err, saved) {
      if (err) {
        cbErr(err);
      }
      cb(saved);
    });
}

module.exports = {
  userModel: UserModel,
  insertUser: insertUser
}
