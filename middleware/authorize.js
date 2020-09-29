const ErrorResponse = require("../utils/errorResponse");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse("Access denied", 403, {
          msg: `User with ${req.user.role} role is not authorize to access this resource`,
        })
      );
    }
  };
};
