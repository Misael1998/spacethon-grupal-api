const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //Log err
  console.log(err);
  error = new ErrorResponse(err.message, err.code, err.body);
  //Handle db errors
  if (err.name == "RequestError") {
    if (err.number == 2627) {
      error = new ErrorResponse("Can't create user", 400, {
        error: "Duplicate email",
      });
    }
  }

  return res.status(error.code || 500).json({
    message: error.message,
    error: error.body,
  });
};

module.exports = errorHandler;
