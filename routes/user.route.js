const express = require("express");
const router = express.Router();
const {register, login, logout} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");


router.post("/register", register)
router.post("/login", login)
router.post("/logout", auth ,logout)

module.exports = router;