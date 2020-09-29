const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./asyncHandler");

module.exports = asyncHandler(async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return next(
      new ErrorResponse("Access denied", 401, {
        msg: "No token, access denied",
      })
    );
  }

  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  const user = {
    id: decoded.id,
    role: decoded.role,
  };

  req.user = user;
  next();
});
