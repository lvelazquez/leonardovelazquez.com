require("dotenv").config();

const config = {
  GMAIL_PASS: process.env.GMAIL_PASS,
  GMAIL_USER: process.env.GMAIL_USER
};

module.exports = config;
