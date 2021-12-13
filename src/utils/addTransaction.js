const Transaction = require("models/Transaction");

// @desc     add transaction util function
const addTransaction = async (userId, walletId, type, details) => {
  const transaction = {
    user_id: userId,
    wallet_id: walletId,
    type,
    details,
  };

  try {
    await Transaction.create(transaction);

    const message = `${type} transaction by user ${userId}.`;

    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = addTransaction;
