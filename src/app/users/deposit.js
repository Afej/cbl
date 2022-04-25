function deposit({ walletRepository, transactionRepository, currentUser }) {
  return async (amount) => {
    let wallet = await walletRepository.find({ user_id: currentUser.id });

    // Make sure user is wallet owner
    if (wallet.user_id.toString() !== currentUser.id) {
      throw new Error(
        `User ${currentUser.id} is not authorized to deposit to this wallet`,
        401
      );
    }

    // get wallet balance and add deposit amount to balance
    let { balance } = wallet;

    balance += amount;

    //update the wallet with new balance
    wallet = await walletRepository.findOneAndUpdate(
      { user_id: currentUser.id },
      { balance },
      {
        new: true,
        runValidators: true,
      }
    );

    // add transaction details
    const details = {
      made_by: currentUser.id,
      amount,
    };

    transactionRepository.addTransaction(
      currentUser.id,
      wallet.id,
      'deposit',
      details
    );

    return {
      wallet,
    };
  };
}

module.exports = deposit;
