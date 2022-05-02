function getAllTransactions({ transactionRepository }) {
  return () => transactionRepository.find({}, {}, {}, true);
}

module.exports = getAllTransactions;
