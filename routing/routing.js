'use strict';
module.exports = function(app) {
  var manager = require('../manager/manager');
  app.route('/users')
    .post(manager.createUser);

  app.route('/login')
    .post(app.oauth.authenticate, manager.login);
};
