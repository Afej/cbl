function getWallet({ walletRepository, currentUser }) {
  return () =>
    walletRepository.find(
      { user_id: currentUser.id },
      {},
      { lean: true, populate: 'transactions' }
    );
}

module.exports = getWallet;
