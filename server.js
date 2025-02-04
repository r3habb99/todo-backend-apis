const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const logger = require("./utils/logger.util");
const connectDB = require("./config/db.config");
const indexRoutes = require("./routes/index");

// PORT
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// index routes
app.use('/api/v1', indexRoutes)

// Function to start the server
const startServer = async() => {
  try {
    await connectDB()
    app.listen(port,  () => {
      logger.info(`Server is running on port ${port}`);
    });
  } catch (error) {
    logger.error("Error starting the server", error);
    process.exit(1); // Exit the process if there is an error
  }
};

// Start the server
startServer();
