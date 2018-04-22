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
  },
  token: {
    type: String,
  },
  expiration_date: {
    type: Number,
  }
});

var UserModel = mongoose.model('users', User);
var insertUser = function(userPostRequest, cb, cbErr) {
    var user = new UserModel(userPostRequest);
    user.save(function(err, saved) {
      if (err) {
        cbErr(err);
      }
      cb(saved);
    });
}

var getUser = function(id, cb, cbErr) {
    UserModel.findOne({'_id':id}, '',function(err, found) {
      if (err) {
        cbErr(err);
      }
      cb(found);
    });
}

var updateUserbyID = function(user, cb, cbErr) {
  UserModel.update({"_id":user._id}, user, function(err) {
    if (err) {
      cbErr(err);
    }
    cb();
  });
};

module.exports = {
  userModel: UserModel,
  insertUser: insertUser,
  getUser: getUser,
  updateUserbyID: updateUserbyID
}
