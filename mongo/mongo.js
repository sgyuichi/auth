'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  id: {
    type: String,
  },
  password: {
    type: String,
  }
});

module.exports = mongoose.model('users', User);
