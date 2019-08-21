const mysql = require("mysql");
const config = require("../config/db");

const pool = mysql.createPool({
  host: "localhost",
  user: config.username,
  password: config.password,
  database: "chatty"
});

module.exports = pool;
