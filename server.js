const express = require("express");
const server = express();
require("dotenv").config({ path: "./env/config.env" });
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const db = require("./db/db");
db();

// Init middleware
server.use(express.json());
server.use(cors());

//Routes files
const register = require("./routes/register");

//Routes setup
server.use("/api/register", register);

//Error handler
server.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
