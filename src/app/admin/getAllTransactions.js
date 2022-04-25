function getAllTransactions({ transactionRepository }) {
  return () => transactionRepository.find();
}

module.exports = getAllTransactions;
