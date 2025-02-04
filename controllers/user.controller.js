const logger = require("../utils/logger.util");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/responses.util");

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      logger.info("User already exists");
      return sendResponse(res, 400, false, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    logger.info("User created successfully");
    sendResponse(res, 201, true, "User created successfully", { newUser });
  } catch (error) {
    logger.error(error.message);
    sendResponse(res, 500, false, error.message);
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      logger.info("User not found");
      return sendResponse(res, 404, false, "User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      logger.info("Invalid password");
      return sendResponse(res, 400, false, "Invalid password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    logger.info("User logged in successfully");
    sendResponse(res, 200, true, "User logged in successfully", { token });
  } catch (error) {
    logger.error(error.message);
    sendResponse(res, 500, false, error.message);
  }
};

// Logout function (handled client-side)
const logout = (req, res) => {
  sendResponse(res, 200, true, "Logged out successfully");
};

module.exports = {
  register,
  login,
  logout,
};
