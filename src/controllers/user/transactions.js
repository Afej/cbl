const ErrorResponse = require("utils/errorResponse");
const asyncHandler = require("middleware/async");
const Transaction = require("models/Transaction");
const Wallet = require("models/Wallet");

// @desc     get all user wallet transactions
// @route     GET /api/v1/wallet/transactions
// @access    Private/User
exports.getTransactions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     add transaction util function
// @route     nil
// @access    Private/User
exports.addTransaction = async (user, wallet, action) => {
  const transactionDetails = {
    user_id: user.id,
    wallet_id: wallet.id,
    action,
  };

  try {
    await Transaction.create(transactionDetails);

    const message = `${action} transaction by user ${user.id} on wallet id ${wallet.id}`;

    console.log(message);
  } catch (error) {
    console.log(error);
  }
};
