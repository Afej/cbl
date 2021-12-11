const express = require("express");
const { deposit, withdraw, transfer } = require("controllers/user/wallet");

// const User = require("models/User");
// const Wallet = require("models/Wallet");

const router = express.Router({ mergeParams: true });

const advancedResults = require("middleware/advancedResults");
const { protect, authorize } = require("middleware/auth");

router.use(protect);

router.route("/deposit").post(authorize("user"), deposit);
router.route("/withdraw").post(authorize("user"), withdraw);
router.route("/transfer").post(authorize("user"), transfer);

module.exports = router;
