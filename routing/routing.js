'use strict';
module.exports = function(app) {
  var manager = require('../manager/manager');

  // todoList Routes
  app.route('/login')
    .post(manager.login);
};
