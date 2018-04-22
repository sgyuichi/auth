'use strict';
const mongoose = require('mongoose'),
  mongo = require('../mongo/mongo');

const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();
const PasswordHash = require('password-hash');

var createUser = function(req, res) {
  req.body.password = PasswordHash.generate(req.body.password);
  mongo.insertUser(req.body, function(user) {
    res.json(user);
  }, function(err) {
    res.send(err);
  });
};

var login = function(req, res) {
    mongo.getUser(req.body.username, function(user) {
      if (!user) {
        res.send('{"error":"Not found"}')
        return;
      }
      if (!PasswordHash.verify(req.body.password, user.password)) {
        res.send('{"error":"Incorrect password"}')
        return;
      }
      user.token = uidgen.generateSync();
      user.expiration_date = Date.now() + 3600*4;
      mongo.updateUserbyID(user, function() {
        res.json(user);
      }, function(err) {
        res.send(err);
      });
    }, function(err) {
      res.send(err);
    });
};

var logout = function(req, res) {
    mongo.getUser(req.body.username, function(user) {
      if (user.token !== req.body.token) {
        res.send('{"error":"Invalid token"}')
        return;
      }
      user.token = ""
      user.expiration_date = 0;
      mongo.updateUserbyID(user, function() {
        res.json({});
      }, function(err) {
        res.send(err);
      });
    }, function(err) {
      res.send(err);
    });
};

var refresh = function(req, res) {
    mongo.getUser(req.body.username, function(user) {
      if (user.token !== req.body.token) {
        res.send('{"error":"Invalid token"}')
        return;
      }
      user.expiration_date = Date.now() / 1000 + 3600*4;
      mongo.updateUserbyID(user, function() {
        res.json({});
      }, function(err) {
        res.send(err);
      });
    }, function(err) {
      res.send(err);
    });
};

var refresh = function(req, res) {
    mongo.getUser(req.body.username, function(user) {
      if (user.token !== req.body.token) {
        res.send('{"error":"Invalid token"}')
        return;
      }
      user.expiration_date = Date.now() / 1000 + 3600*4;
      mongo.updateUserbyID(user, function() {
        res.json({});
      }, function(err) {
        res.send(err);
      });
    }, function(err) {
      res.send(err);
    });
};

var authenticate = function(req, res) {
    mongo.getUser(req.body.username, function(user) {
      if (user.token !== req.body.token) {
        res.send('{"error":"Invalid token"}')
        return;
      }
      if (Date.now() / 1000 > user.expiration_date) {
        res.send('{"error":"Token expired"}')
        return
      }
      res.json({});
    }, function(err) {
      res.send(err);
    });
};

module.exports = {
  createUser: createUser,
  login: login,
  logout: logout,
  refresh: refresh,
  authenticate: authenticate
}
