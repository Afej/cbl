const ErrorResponse = require("utils/errorResponse");
const asyncHandler = require("middleware/async");
const sendTokenResponse = require("utils/sendTokenResponse");
const User = require("models/User");
const Wallet = require("models/Wallet");

// @desc      Deposit to user wallet
// @route     POST /api/v1/wallet/deposit
// @access    Private/User
exports.deposit = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  const user = req.user;

  // Validation
  if (!amount) {
    return next(new ErrorResponse("Please provide deposit amount", 400));
  }

  // get user wallet
  let wallet = await Wallet.findOne({ user_id: user.id });

  // Make sure user is wallet owner
  if (wallet.user_id.toString() !== user.id) {
    return next(
      new ErrorResponse(
        `User ${user.id} is not authorized to deposit to this wallet`,
        401
      )
    );
  }

  // get wallet balance and add deposit amount to balance
  let { balance } = wallet;

  balance += amount;

  //update the wallet with new balance
  wallet = await Wallet.findOneAndUpdate(
    { user_id: user.id },
    { balance },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: wallet,
  });
});

// @desc      Withdraw from user wallet
// @route     POST /api/v1/wallet/withdraw
// @access    Private/User
exports.withdraw = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  const user = req.user;

  // Validation
  if (!amount) {
    return next(new ErrorResponse("Please provide withdrawal amount", 400));
  }

  let wallet = await Wallet.findOne({ user_id: user.id });

  // Make sure user is wallet owner
  if (wallet.user_id.toString() !== user.id) {
    return next(
      new ErrorResponse(
        `User ${user.id} is not authorized to withdraw from this wallet`,
        401
      )
    );
  }

  // get wallet balance and remove withdrawal amount from balance
  let { balance } = wallet;

  balance -= amount;

  //update the wallet with new balance
  wallet = await Wallet.findOneAndUpdate(
    { user_id: user.id },
    { balance },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: wallet,
  });
});
