// const { pick } = require('lodash');
const BaseController = require('./BaseController');

class TransactionController extends BaseController {
  constructor({ getTransaction, getAllTransactions, reverseTransaction }) {
    super();
    this.getTransaction = getTransaction;
    this.getAllTransactions = getAllTransactions;
    this.reverseTransaction = reverseTransaction;
  }

  async getTransaction(req, res) {
    const transactionId = req.params.transactionId;
    const transaction = await this.getTransaction(transactionId);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(transaction, 'transaction fetched successfully!');
  }

  async getAllTransactions(req, res) {
    const transactions = await this.getAllTransactions();
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(transactions, 'All transactions fetched successfully!');
  }

  async reverseTransaction(req, res) {
    const transactionId = req.params.transactionId;

    const transaction = await this.reverseTransaction(transactionId);
    return this.responseBuilder.onSuccess(
      res,
      'Transfer reversal successful!',
      transaction
    );
  }
}

module.exports = TransactionController;
