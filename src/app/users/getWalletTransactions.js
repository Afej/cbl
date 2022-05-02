function getWalletTransactions({ transactionRepository }) {
  return (walletId) => {
    console.log({ walletId });
    transactionRepository.find({ wallet_id: walletId }, {}, {}, true);
  };
}

module.exports = getWalletTransactions;
