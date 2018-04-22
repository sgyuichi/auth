'use strict';
module.exports = function(app) {
  var manager = require('../manager/manager');

  app.route('/users')
    .post(manager.createUser);

  app.route('/login')
    .post(manager.login);

  app.route('/logout')
    .post(manager.logout);

  app.route('/refresh')
    .patch(manager.refresh);

  app.route('/authenticate')
    .get(manager.authenticate);
};
