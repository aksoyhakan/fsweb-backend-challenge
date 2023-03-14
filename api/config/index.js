require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || "shh",
  NODE_ENV: process.env.NODE_ENV || "development",
};
