const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { login } = require("../controllers/login");

router
  .route("/")
  .post(
    [
      check("email", "A valid email is required").isEmail(),
      check("password", "Password is required").exists(),
    ],
    login
  );

module.exports = router;
