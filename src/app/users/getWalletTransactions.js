function getWalletTransactions({ transactionRepository }) {
  return (walletId) =>
    transactionRepository.find({ wallet_id: walletId }, {}, {}, true);
}

module.exports = getWalletTransactions;
