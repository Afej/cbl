const express = require("express");
const { login, logout, getMe } = require("controllers/user/auth");

const router = express.Router();

const { protect } = require("middleware/auth");

router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;
