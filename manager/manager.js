'use strict';
const mongoose = require('mongoose'),
  errors = require('./errors'),
  mongo = require('../mongo/mongo'),
  UIDGenerator = require('uid-generator'),
  uidgen = new UIDGenerator(),
  PasswordHash = require('password-hash');

var createUser = function(req, res) {
  try {
    req.body.password = PasswordHash.generate(req.body.password);
  } catch(err) {
    errors.returnInternalError(req, res, err);
    return;
  }
  mongo.insertUser(req.body, function(user) {
    res.json(user);
  }, function(err) {
    errors.returnInternalError(req, res, err);
  });
};

var login = function(req, res) {
    mongo.getUser(req.body.username, function(user) {
      if (!user) {
        errors.returnNotFoundError(req, res);
        return;
      }
      if (!PasswordHash.verify(req.body.password, user.password)) {
        errors.returnBadRequestError(req, res, 'Incorrect password')
        return;
      }
      user.token = uidgen.generateSync();
      user.expiration_date = Date.now() + 3600*4;
      mongo.updateUserbyID(user, function() {
        res.json({token: user.token});
      }, function(err) {
        errors.returnInternalError(req, res, err);
      });
    }, function(err) {
        errors.returnInternalError(req, res, err);
    });
};

var logout = function(req, res) {
    mongo.getUser(req.body.username, function(user) {
      if (user.token !== req.body.token) {
        errors.returnUnauthorizedError(req, res, 'Invalid Token');
        return;
      }
      user.token = "";
      user.expiration_date = 0;
      mongo.updateUserbyID(user, function() {
        res.json({});
      }, function(err) {
        errors.returnInternalError(req, res, err);
      });
    }, function(err) {
      errors.returnInternalError(req, res, err);
    });
};

var refresh = function(req, res) {
    mongo.getUser(req.body.username, function(user) {
      if (user.token !== req.body.token) {
        errors.returnUnauthorizedError(req, res, 'Invalid Token');
        return;
      }
      if (Date.now() / 1000 > user.expiration_date) {
        errors.returnUnauthorizedError(req, res, 'Token Expired');
        return
      }
      user.expiration_date = Date.now() / 1000 + 3600*4;
      mongo.updateUserbyID(user, function() {
        res.json({});
      }, function(err) {
        errors.returnInternalError(req, res, err);
      });
    }, function(err) {
      errors.returnInternalError(req, res, err);
    });
};

var authenticate = function(req, res) {
    mongo.getUser(req.body.username, function(user) {
      if (!user) {
        errors.returnNotFoundError(req, res);
        return;
      }
      if (user.token !== req.body.token) {
        errors.returnUnauthorizedError(req, res, 'Invalid Token');
        return;
      }
      if (Date.now() / 1000 > user.expiration_date) {
        errors.returnUnauthorizedError(req, res, 'Token Expired');
        return
      }
      res.json({});
    }, function(err) {
      rerrors.returnInternalError(req, res, err);
    });
};

module.exports = {
  createUser: createUser,
  login: login,
  logout: logout,
  refresh: refresh,
  authenticate: authenticate
}
