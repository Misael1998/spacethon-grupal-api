const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const db = require("mssql");

//@desc     get records
//@route    GET /api/records/:type
//@access   PRIVATE
exports.records = asyncHandler(async (req, res, next) => {
  const { type } = req.params;
  switch (type) {
    case "temperature":
      console.log("mis");
      break;

    default:
      return next(
        new ErrorResponse(
          "Not found",
          404,
          `Cant get route /api/records/${type}`
        )
      );
      break;
  }
  return res.send("temperature query");
});

//@desc     get records
//@route    GET /api/records/:type/:dates
//@access   PRIVATE
exports.recordsByDate = asyncHandler(async (req, res, next) => {
  return res.send("temperature query");
});
