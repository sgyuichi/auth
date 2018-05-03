'use strict';
const { checkSchema, oneOf, validationResult } = require('express-validator/check');
const manager = require('../manager/manager');
const errors = require('../manager/errors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app) {

  app.route('/users')
    .post(checkJson, [oneOf([checkSchema({
       password: {
          isLength: {
            errorMessage: 'password should be at least 7 chars long',
            options: { min: 7 }
          }
        },
      _id: {
         isLength: {
           errorMessage: '_id should not be empty',
           options: { min: 1 }
         }
       },
      name: {
         isLength: {
           errorMessage: 'name should not be empty',
           options: { min: 1 }
         }
      },
    })]), checkValidationResult], manager.createUser);

  app.route('/login')
    .post(checkJson, [oneOf([checkSchema({
       password: {
          isLength: {
            errorMessage: 'password should not be empty',
            options: { min: 1 }
          }
        },
        username: {
           isLength: {
             errorMessage: 'username should not be empty',
             options: { min: 1 }
           }
         },
    })]), checkValidationResult], manager.login);

  app.route('/logout')
    .post(checkJson, [oneOf([checkSchema(tokenUsernameSchema)]), checkValidationResult], manager.logout);

  app.route('/refresh')
    .patch(checkJson, [oneOf([checkSchema(tokenUsernameSchema)]), checkValidationResult], manager.refresh);

  app.route('/authenticate')
    .get(checkJson, [oneOf([checkSchema(tokenUsernameSchema)]), checkValidationResult], manager.authenticate);

  app.route('*')
    .all(errors.returnPageNotFoundError);
};

const tokenUsernameSchema = {
   token: {
      isLength: {
        errorMessage: 'token should not be empty',
        options: { min: 1 }
      }
    },
    username: {
       isLength: {
         errorMessage: 'username should not be empty',
         options: { min: 1 }
       }
     },
};

function checkJson(req, res, next) {
  jsonParser(req, res, () => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return errors.returnBadRequestError(req, res, "could not parse json request");
    }
    return next();
  });

}

function checkValidationResult(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    errors.returnBadRequestErrors(req, res, result.array())
}
