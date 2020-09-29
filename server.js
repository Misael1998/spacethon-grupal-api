const express = require("express");
const server = express();
require("dotenv").config({ path: "./env/config.env" });
const cors = require("cors");

const db = require("./db/db");
db();

// Init middleware
server.use(express.json());
server.use(cors());

//Routes files

//Routes setup

//Error handler

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
