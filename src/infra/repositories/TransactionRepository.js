const BaseRepository = require('./BaseRepository');

class TransactionRepository extends BaseRepository {
  constructor({ models: { Transaction }, logger }) {
    super({ Model: Transaction });
    this.Transaction = Transaction;
    this.logger = logger;
  }

  async addTransaction(userId, walletId, type, details) {
    const transaction = {
      user_id: userId,
      wallet_id: walletId,
      type,
      details,
    };

    try {
      await this.Transaction.create(transaction);

      const message = `${type} transaction by user ${userId}.`;

      this.logger.info(message);
    } catch (error) {
      this.logger.error(error, {
        error: err.toString(),
      });
    }
  }
}

module.exports = TransactionRepository;
