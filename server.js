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
const login = require("./routes/login");
const readings = require("./routes/readings");

//Routes setup
server.use("/api/register", register);
server.use("/api/login", login);
server.use("/api/readings", readings);

//Error handler
server.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Making test");
  console.log(`server running on ${process.env.PORT}`);
});
