const dotenv = require("dotenv").config();

const config = {
  dev: {
    user: "root",
    password: process.env.DB_PASSWORD,
    host: "localhost",
    database: "test9",
    multipleStatements: true,
  },
};

const config2 = {
  dev2: {
    user: "root",
    password: process.env.DB_PASSWORD,
    // host 주소
    host: "127.0.0.1",
    database: "test10",
    dialect: "mysql",
  },
};

module.exports = config;
