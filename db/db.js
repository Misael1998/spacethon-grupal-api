const mssql = require("mssql");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;

const db = async () => {
  try {
    await mssql.connect({
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      server: DB_HOST,
      options: {
        enableArithAbort: false,
      },
    });
    console.log("db conected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
