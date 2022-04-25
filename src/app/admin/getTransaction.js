function getTransaction({ transactionRepository }) {
  return (transactionId) => transactionRepository.findById(transactionId);
}

module.exports = getTransaction;
