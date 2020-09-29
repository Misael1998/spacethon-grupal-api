const asyncHandler = require("../middleware/asyncHandler");
const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/errorResponse");
const db = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc     Login route
//@route    POST    /api/login
//@access   PUBLIC
exports.login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse("Validation errors", 500, errors.array()));
  }

  const { email, password } = req.body;

  const query = await new db.Request()
    .input("email", db.VarChar(100), email)
    .query("select * from [dbo].[TF_GET_USER](@email)");

  let data = query.recordset;
  if (data.length === 0) {
    return next(
      new ErrorResponse("Invalid credentials", 400, {
        message: "Incorrect email or password",
      })
    );
  }
  data = data[0];

  const isMatch = await bcrypt.compare(password, data.password);

  if (!isMatch) {
    return next(
      new ErrorResponse("Invalid credentials", 400, {
        message: "Incorrect email or password",
      })
    );
  }

  const payload = {
    user: data.id,
    role: data.role,
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE },
    (err, token) => {
      if (err) return next(new Error(err));
      return res.status(200).json({
        user: {
          name: `${data.firstName} ${data.lastName}`,
          email,
        },
        token,
      });
    }
  );
});
