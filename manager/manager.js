'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('users');

exports.login = function(req, res) {
  console.log(req.body);
  var new_task = new User(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
