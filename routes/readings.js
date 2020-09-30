const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { readings, readindsByDate } = require("../controllers/readings");

router.route("/:type").get(auth, readings);

router.route("/:type/:dates").get(auth, readindsByDate);

module.exports = router;
