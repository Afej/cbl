const ErrorResponse = require("utils/errorResponse");
const asyncHandler = require("middleware/async");
const User = require("models/User");
const Wallet = require("models/Wallet");
const { addTransaction } = require("utils/addTransaction");

// @desc      Get user wallet
// @route     GET /api/v1/wallet
// @access    Private/User
exports.getWallet = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.findOne({ user_id: req.user.id }).populate({
    path: "transactions",
    // select: "balance",
  });

  if (!wallet) {
    return next(
      new ErrorResponse(
        `Wallet not found for user with id of ${req.user.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: wallet,
  });
});

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

  // add transaction details
  const details = {
    made_by: user.id,
    amount,
  };
  addTransaction(user.id, wallet.id, "deposit", details);

  res.status(200).json({
    success: true,
    message: "Deposit complete!",
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

  // check that balance is greater than withdrawal amount
  if (balance < amount) {
    return next(new ErrorResponse(`Insufficient wallet balance`, 400));
  }

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

  // add transaction
  const details = {
    made_by: user.id,
    amount,
  };
  addTransaction(user.id, wallet.id, "withdrawal", details);

  res.status(200).json({
    success: true,
    message: "Withdrawal complete!",
    data: wallet,
  });
});

// @desc      transfer from user wallet to another wallet
// @route     POST /api/v1/wallet/transfer
// @access    Private/User
exports.transfer = asyncHandler(async (req, res, next) => {
  const { amount, receiver_email } = req.body;

  const user = req.user;

  // Validation
  if (!amount || !receiver_email) {
    return next(
      new ErrorResponse(
        "Please provide transfer amount and receiver email",
        400
      )
    );
  }

  // check that receiver email is not logged in user email
  if (receiver_email === user.email) {
    return next(
      new ErrorResponse(
        `Unable to process transfer to logged in user account`,
        400
      )
    );
  }

  // find receiver and retrieve details
  const receiver = await User.findOne({ email: receiver_email });

  if (!receiver) {
    return next(
      new ErrorResponse(`User not found with email of ${receiver_email}`, 404)
    );
  }

  // get both wallets
  let receiver_wallet = await Wallet.findOne({ user_id: receiver.id });

  let user_wallet = await Wallet.findOne({ user_id: user.id });

  // Make sure logged in user is wallet owner
  if (user_wallet.user_id.toString() !== user.id) {
    return next(
      new ErrorResponse(
        `User ${user.id} is not authorized to transfer from this wallet`,
        401
      )
    );
  }

  // check that wallet is not null
  if (receiver_wallet === null || user_wallet === null) {
    return next(new ErrorResponse(`Wallet is null`, 404));
  }

  let { balance: user_balance } = user_wallet;
  let { balance: receiver_balance } = receiver_wallet;

  // check that user balance is greater than transfer amount
  if (user_balance < amount) {
    return next(
      new ErrorResponse(`Insufficient wallet balance to make transfer`, 400)
    );
  }

  user_balance -= amount; // deduct from user balance
  receiver_balance += amount; // add to receiver balance

  //update the user wallet with new balance
  user_wallet = await Wallet.findOneAndUpdate(
    { user_id: user.id },
    { balance: user_balance },
    {
      new: true,
      runValidators: true,
    }
  );

  //update the receiver wallet with new balance
  receiver_wallet = await Wallet.findOneAndUpdate(
    { user_id: receiver.id },
    { balance: receiver_balance },
    {
      new: true,
      runValidators: true,
    }
  );

  // add transaction
  const transferDetails = {
    from: user.id,
    to: receiver.id,
    amount,
  };
  addTransaction(user.id, user_wallet.id, "transfer", transferDetails);

  // deposit transaction for receiver
  const depositDetails = {
    from: user.id,
    amount,
  };
  addTransaction(receiver.id, receiver_wallet.id, "deposit", depositDetails);

  res.status(200).json({
    success: true,
    message: "Transfer complete!",
    data: { user_wallet, receiver_wallet },
  });
});
