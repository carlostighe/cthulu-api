// external imports
const mysql = require("mysql2");
require("dotenv").config();

// create the database connection
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// return the database connection as middleware
module.exports = async (req, res, next) => {
  req.db = connection;
  next();
};
