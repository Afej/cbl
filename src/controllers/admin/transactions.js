const ErrorResponse = require("utils/errorResponse");
const asyncHandler = require("middleware/async");
const Transaction = require("models/Transaction");
const Wallet = require("models/Wallet");

const addTransaction = require("utils/addTransaction");

// @desc     get all users wallet transactions
// @route     GET /api/v1/wallet/transactions
// @access    Private/Admin
exports.getAllTransactions = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc     get single wallet transaction
// @route     GET /api/v1/wallet/transactions/:transactionId
// @access    Private/Admin
exports.getTransaction = asyncHandler(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.transactionId);

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction with id of ${req.params.transactionId} not found`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    message: "Transaction retrieved!",
    data: transaction,
  });
});

// @desc     reverse wallet transaction
// @route     PUT /api/v1/wallet/transactions/:transactionId
// @access    Private/Admin
exports.reverseTransaction = asyncHandler(async (req, res, next) => {
  const transactionId = req.params.transactionId;
  let transaction = await Transaction.findById(transactionId);

  if (!transaction) {
    return next(
      new ErrorResponse(
        `Transaction with id of ${transactionId} not found`,
        404
      )
    );
  }

  if (transaction.type !== "transfer") {
    return next(
      new ErrorResponse(`Only Transfer transactions can be reversed.`, 400)
    );
  }

  //   Get transfer transaction details
  const { from: senderId, to: receiverId, amount } = transaction.details;

  // get both user wallets
  let receiver_wallet = await Wallet.findOne({ user_id: receiverId });

  let sender_wallet = await Wallet.findOne({ user_id: senderId });

  // retrieve balance
  let { balance: sender_balance } = sender_wallet;
  let { balance: receiver_balance } = receiver_wallet;

  //   console.log("sender old balance", sender_balance);
  //   console.log("receiver old balance", receiver_balance);

  // reverse the balance
  sender_balance += amount; // add to sender
  receiver_balance -= amount; // deduct from receiver

  //   console.log("sender balance", sender_balance);
  //   console.log("receiver balance", receiver_balance);

  //update the sender wallet with new balance
  sender_wallet = await Wallet.findOneAndUpdate(
    { user_id: senderId },
    { balance: sender_balance },
    {
      new: true,
      runValidators: true,
    }
  );

  //update the receiver wallet with new balance
  receiver_wallet = await Wallet.findOneAndUpdate(
    { user_id: receiverId },
    { balance: receiver_balance },
    {
      new: true,
      runValidators: true,
    }
  );

  // reversal transactions for sender and receiver
  const senderDetails = {
    amount,
    description: `Transfer reversal of amount +${amount}`,
  };

  const receiverDetails = {
    amount,
    description: `Transfer reversal of amount -${amount}`,
  };

  addTransaction(senderId, sender_wallet.id, "reversal", senderDetails);
  addTransaction(receiverId, receiver_wallet.id, "reversal", receiverDetails);

  //   update transaction from transfer to reverse so it can only be reversed once
  transaction = await Transaction.findOneAndUpdate(
    { _id: transactionId },
    { type: "reversal" },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Transfer reversal completed",
    data: transaction,
  });
});
