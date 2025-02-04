const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "bin/error.log", level: "error" }),
    new winston.transports.File({ filename: "bin/combined.log" }),
  ],
});

module.exports = logger;
