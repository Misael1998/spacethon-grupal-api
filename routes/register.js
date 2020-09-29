const express = require("express");
const router = express.Router();
const { chech, check } = require("express-validator");

const { register } = require("../controllers/register");

router.route("/").post(
  [
    check("firstName", "Firs name is required").isLength({
      min: 2,
      max: 100,
    }),
    check("lastName", "Firs name is required").isLength({ min: 2, max: 100 }),
    check("email", "Valid email is required").isEmail(),
    check("password", "min of 8 character password is required").isLength({
      min: 8,
    }),
  ],
  register
);

module.exports = router;
