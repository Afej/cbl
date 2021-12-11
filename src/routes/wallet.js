const express = require("express");
const { deposit, withdraw } = require("controllers/user/wallet");

// const User = require("models/User");
// const Wallet = require("models/Wallet");

const router = express.Router({ mergeParams: true });

const advancedResults = require("middleware/advancedResults");
const { protect, authorize } = require("middleware/auth");

router.use(protect);

router.route("/deposit").post(authorize("user"), deposit);
router.route("/withdraw").post(authorize("user"), withdraw);

module.exports = router;
