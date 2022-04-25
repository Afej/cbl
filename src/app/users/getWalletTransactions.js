function getWalletTransactions({ transactionRepository }) {
  return (walletId) => {
    transactionRepository.find({ wallet_id: walletId });
  };
}

module.exports = getWalletTransactions;
