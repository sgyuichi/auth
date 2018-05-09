'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
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
  },
});

let UserModel = mongoose.model('users', User);
let insertUser = function(userPostRequest, cb, cbErr) {
    let user = new UserModel(userPostRequest);
    user.save(function(err, saved) {
      if (err) {
        cbErr(err);
      }
      cb(saved);
    });
};

let getUser = function(id, cb, cbErr) {
    UserModel.findOne({'_id': id}, '', function(err, found) {
      if (err) {
        cbErr(err);
      }
      cb(found);
    });
};

let updateUserbyID = function(user, cb, cbErr) {
  UserModel.update({'_id': user._id}, user, function(err) {
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
  updateUserbyID: updateUserbyID,
};
