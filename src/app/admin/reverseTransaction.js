function reverseTransaction({ walletRepository, transactionRepository }) {
  return async (transactionId) => {
    let transaction = await transactionRepository.findById(transactionId);

    if (transaction.type !== 'transfer') {
      throw new Error(`Only Transfer transactions can be reversed.`, 400);
    }

    //   Get transfer transaction details
    const { from: senderId, to: receiverId, amount } = transaction.details;

    // get both user wallets
    let receiver_wallet = await walletRepository.find({ user_id: receiverId });

    let sender_wallet = await walletRepository.find({ user_id: senderId });

    // retrieve balance
    let { balance: sender_balance } = sender_wallet;
    let { balance: receiver_balance } = receiver_wallet;

    // reverse the balance
    sender_balance += amount; // add to sender
    receiver_balance -= amount; // deduct from receiver

    //update the sender wallet with new balance
    sender_wallet = await walletRepository.findOneAndUpdate(
      { user_id: senderId },
      { balance: sender_balance },
      {
        new: true,
        runValidators: true,
      }
    );

    //update the receiver wallet with new balance
    receiver_wallet = await walletRepository.findOneAndUpdate(
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

    transactionRepository.addTransaction(
      senderId,
      sender_wallet.id,
      'reversal',
      senderDetails
    );

    transactionRepository.addTransaction(
      receiverId,
      receiver_wallet.id,
      'reversal',
      receiverDetails
    );

    //   update transaction from transfer to reverse so it can only be reversed once
    transaction = await transactionRepository.findOneAndUpdate(
      { _id: transactionId },
      { type: 'reversal' },
      {
        new: true,
        runValidators: true,
      }
    );

    return {
      transaction,
    };
  };
}

module.exports = reverseTransaction;
