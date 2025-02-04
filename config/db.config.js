const mongoose = require("mongoose");
const logger = require("../utils/logger.util");
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/todo-app";
const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    logger.info("Connected to the database");
  } catch (error) {
    logger.error("Error connecting to the database", error);
    process.exit(1);
  }
};

// Export the connect function
module.exports =  connectToDatabase;
