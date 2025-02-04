const jwt = require("jsonwebtoken");
const logger = require("../utils/logger.util");
const sendResponse = require("../utils/responses.util");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader.startsWith("Bearer ")) {
    logger.error("Access denied - No token provided");
    return sendResponse(res, 401, "Access denied - No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Invalid token");
    return sendResponse(res, 400, "Invalid token");
  }
};

module.exports = auth;
