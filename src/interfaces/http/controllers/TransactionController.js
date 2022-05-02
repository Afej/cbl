// const { pick } = require('lodash');
const BaseController = require('./BaseController');

class TransactionController extends BaseController {
  constructor({ getTransaction, getAllTransactions, reverseTransaction }) {
    super();
    this.getTransactionCtrl = getTransaction;
    this.getAllTransactionsCtrl = getAllTransactions;
    this.reverseTransactionCtrl = reverseTransaction;
  }

  async getTransaction(req, res) {
    const transactionId = req.params.transactionId;
    const transaction = await this.getTransactionCtrl(transactionId);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(transaction, 'transaction fetched successfully!');
  }

  async getAllTransactions(req, res) {
    const transactions = await this.getAllTransactionsCtrl();
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(transactions, 'All transactions fetched successfully!');
  }

  async reverseTransaction(req, res) {
    const transactionId = req.params.transactionId;

    const transaction = await this.reverseTransactionCtrl(transactionId);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(transaction, 'Transfer reversal successful!');
  }
}

module.exports = TransactionController;
