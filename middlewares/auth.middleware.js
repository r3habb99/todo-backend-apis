const jwt = require("jsonwebtoken");
const logger = require("../utils/logger.util");

const auth = (req, res, next) => {
    const token = req.header("Authorization", "Bearer ").split(" ")[1];
    if (!token) {
        logger.error("Access denied");
        return res.status(401).json({ message: "Access denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        logger.error("Invalid token");
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = auth