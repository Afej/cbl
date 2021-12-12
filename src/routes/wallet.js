const express = require("express");
const {
  deposit,
  withdraw,
  transfer,
  getWallet,
} = require("controllers/user/wallet");
const {
  getAllTransactions,
  getUserTransactions,
} = require("controllers/user/transactions");

const Transaction = require("models/Transaction");

const router = express.Router({ mergeParams: true });

const advancedResults = require("middleware/advancedResults");
const { protect, authorize } = require("middleware/auth");

router.use(protect);

router.route("/").get(authorize("user"), getWallet);
router.route("/deposit").post(authorize("user"), deposit);
router.route("/withdraw").post(authorize("user"), withdraw);
router.route("/transfer").post(authorize("user"), transfer);

router
  .route("/:walletId/transactions")
  .get(authorize("user"), getUserTransactions);

router
  .route("/transactions")
  .get(authorize("admin"), advancedResults(Transaction), getAllTransactions);

module.exports = router;
