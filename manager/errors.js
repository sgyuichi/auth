let returnNotFoundError = function(req, res, err) {
  res.status(404);
  res.json({
    code: 404,
    message: 'Not Found',
    error: err,
  });
};

let returnPageNotFoundError = function(req, res, err) {
  res.status(404);
  res.json({
    code: 404,
    message: 'Page Not Found',
    error: err,
  });
};

let returnUnauthorizedError = function(req, res, err) {
  res.status(401);
  res.json({
    code: 401,
    message: 'Unauthorized',
    error: err,
  });
};

let returnInternalError = function(req, res, err) {
  res.status(500);
  res.json({
    code: 500,
    message: 'Internal Error',
    error: err,
  });
};

let returnBadRequestError = function(req, res, err) {
  res.status(400);
  res.json({
    code: 400,
    message: 'Bad Request',
    error: err,
  });
};

let returnBadRequestErrors = function(req, res, errs) {
  res.status(400);
  res.json({
    code: 400,
    message: 'Bad Request',
    errors: errs,
  });
};

module.exports = {
  returnNotFoundError: returnNotFoundError,
  returnUnauthorizedError: returnUnauthorizedError,
  returnInternalError: returnInternalError,
  returnBadRequestError: returnBadRequestError,
  returnBadRequestErrors: returnBadRequestErrors,
  returnPageNotFoundError: returnPageNotFoundError,
};
