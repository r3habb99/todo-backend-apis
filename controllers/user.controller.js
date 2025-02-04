const logger = require("../utils/logger.util")

const User = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if the user already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            logger.info("User already exists");
            return res.status(400).json({message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        logger.info("User created successfully");
        res.status(201).json( {message: "User created successfully", newUser});
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({message: error.message})
    }
}
 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //find user by email
        const user = await User.findOne({ email });
        if (!user) {
            logger.info("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        //validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            logger.info("Invalid password");
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        logger.info("User logged in successfully");
        res.status(200).json({ token });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ message: error.message });
    }
}

// Logout function (invalidate token) - typically done on the client-side
const logout = (req, res) => {
    res.json({ message: "Logged out successfully." });
};

module.exports = {
    register,
    login,
    logout
}