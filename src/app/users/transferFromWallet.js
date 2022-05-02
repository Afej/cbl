function transferFromWallet({
  walletRepository,
  transactionRepository,
  userRepository,
  currentUser,
}) {
  return async ({ amount, receiver_email }) => {
    let wallet = await walletRepository.find({ user_id: currentUser.id });

    // console.log({ wallet, currentUser });

    // check that receiver email is not logged in user email
    if (receiver_email === currentUser.email) {
      throw new Error(
        `Unable to process transfer to logged in user account`,
        400
      );
    }

    // find receiver and retrieve details
    const receiver = await userRepository.find({ email: receiver_email });

    if (!receiver) {
      throw new Error(`User not found with email of ${receiver_email}`, 404);
    }

    // get both wallets
    let receiver_wallet = await walletRepository.find({ user_id: receiver.id });

    let user_wallet = await walletRepository.find({ user_id: currentUser.id });

    // Make sure user is wallet owner
    if (wallet.user_id.toString() !== currentUser.id) {
      throw new Error(
        `User ${currentUser.id} is not authorized to deposit to this wallet`,
        401
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
      throw new Error(`Insufficient wallet balance to make transfer`, 400);
    }

    user_balance -= amount; // deduct from user balance
    receiver_balance += amount; // add to receiver balance

    //update the user wallet with new balance
    user_wallet = await walletRepository.findOneAndUpdate(
      { user_id: currentUser.id },
      { balance: user_balance },
      {
        new: true,
        runValidators: true,
      }
    );

    //update the receiver wallet with new balance
    receiver_wallet = await walletRepository.findOneAndUpdate(
      { user_id: receiver.id },
      { balance: receiver_balance },
      {
        new: true,
        runValidators: true,
      }
    );

    // add transfer transaction for wallet user
    const transferDetails = {
      from: currentUser.id,
      to: receiver.id,
      amount,
    };

    transactionRepository.addTransaction(
      currentUser.id,
      user_wallet.id,
      'transfer',
      transferDetails
    );

    // add deposit transaction for receiver
    const depositDetails = {
      from: currentUser.id,
      amount,
    };

    transactionRepository.addTransaction(
      receiver.id,
      receiver_wallet.id,
      'deposit',
      depositDetails
    );

    return {
      user_wallet,
      receiver_wallet,
    };
  };
}

module.exports = transferFromWallet;
