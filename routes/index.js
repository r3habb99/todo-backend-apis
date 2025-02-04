const express = require("express");
const userRoutes = require("./user.route")
const taskRoutes = require("./task.route");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", auth, taskRoutes);

module.exports = router;

