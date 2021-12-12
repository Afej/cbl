const ErrorResponse = require("utils/errorResponse");
const asyncHandler = require("middleware/async");
const Transaction = require("models/Transaction");
const Wallet = require("models/Wallet");

// @desc     get all users wallet transactions
// @route     GET /api/v1/wallet/transactions
// @access    Private/Admin
exports.getAllTransactions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

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

// @desc     add transaction util function
exports.addTransaction = async (user, wallet, type, details) => {
  const transaction = {
    user_id: user.id,
    wallet_id: wallet.id,
    type,
    details,
  };

  try {
    await Transaction.create(transaction);

    const message = `${type} transaction by user ${user.id}.`;

    console.log(message);
  } catch (error) {
    console.log(error);
  }
};
