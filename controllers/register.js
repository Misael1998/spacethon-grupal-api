const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("mssql");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");

//@desc     Register new user
//@route    POST    /api/register
//@access   PUBLIC
exports.register = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse("Bad request", 500, errors.array()));
  }

  const { firstName, lastName, email, password, institution } = req.body;

  //Insert into db
  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(password, salt);

  const storedProc = await new db.Request()
    .input("firstName", db.VarChar(100), firstName)
    .input("lastName", db.VarChar(100), lastName)
    .input("email", db.VarChar(500), email)
    .input("institution", db.VarChar(100), institution)
    .input("password", db.VarChar(db.MAX), encriptedPassword)
    .input("role", db.VarChar(100), "user")
    .output("status", db.VarChar(1))
    .output("userID", db.Int)
    .execute("SP_REGISTER_USER");

  const payload = {
    user: storedProc.output.userID,
    role: "user",
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE },
    (err, token) => {
      if (err) return next(new Error(err));
      return res.status(201).json({
        user: {
          name: `${firstName} ${lastName}`,
          email,
        },
        token,
      });
    }
  );
});
