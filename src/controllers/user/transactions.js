const ErrorResponse = require("utils/errorResponse");
const asyncHandler = require("middleware/async");
const Transaction = require("models/Transaction");

// @desc     get user wallet transactions
// @route     GET /api/v1/wallet/:walletId/transactions
// @access    Private/User
exports.getUserTransactions = asyncHandler(async (req, res, next) => {
  const transactions = await Transaction.find({
    wallet_id: req.params.walletId,
  });

  if (!transactions) {
    return next(
      new ErrorResponse(
        `Transactions not found for User wallet with id of ${req.params.walletId}`,
        404
      )
    );
  }

  res
    .status(200)
    .json({ success: true, count: transactions.length, data: transactions });
});
