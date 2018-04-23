var returnNotFoundError = function(err,req, res) {
  res.status(404);
  res.json({
    code: 404,
    message: "Not Found",
    error: err
  });
}

var returnPageNotFoundError = function(req, res, err) {
  res.status(404);
  res.json({
    code: 404,
    message: "Page Not Found",
    error: err
  });
}

var returnUnauthorizedError = function(req, res, err) {
  res.status(401);
  res.json({
    code: 401,
    message: "Unauthorized",
    error: err
  });
}

var returnInternalError = function(req, res, err) {
  res.status(500);
  res.json({
    code: 500,
    message: "Internal Error",
    error: err
  });
}

var returnBadRequestError = function(req, res, err) {
  res.status(400);
  res.json({
    code: 400,
    message: "Bad Request",
    error: err
  });
}

module.exports = {
  returnNotFoundError: returnNotFoundError,
  returnUnauthorizedError: returnUnauthorizedError,
  returnInternalError: returnInternalError,
  returnBadRequestError: returnBadRequestError,
  returnPageNotFoundError: returnPageNotFoundError
}
