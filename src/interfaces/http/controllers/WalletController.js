const { pick } = require('lodash');
const BaseController = require('./BaseController');

class WalletController extends BaseController {
  constructor({
    deposit,
    withdraw,
    transferFromWallet,
    getWallet,
    getWalletTransactions,
  }) {
    super();
    this.depositCtrl = deposit;
    this.withdrawCtrl = withdraw;
    this.getWalletCtrl = getWallet;
    this.transferFromWalletCtrl = transferFromWallet;
    this.getWalletTransactionsCtrl = getWalletTransactions;
  }

  async getWallet(req, res) {
    const wallet = await this.getWalletCtrl();
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(wallet, 'Wallet fetched successfully!');
  }

  async deposit(req, res) {
    const { amount } = req.body;

    const wallet = await this.depositCtrl(amount);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(wallet, 'Successful deposit!');
  }

  async withdraw(req, res) {
    const { amount } = req.body;

    const wallet = await this.withdrawCtrl(amount);

    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(wallet, 'Successful withdrawal!');
  }

  async transferFromWallet(req, res) {
    const payload = pick(req.body, ['amount', 'receiver_email']);

    const data = await this.transferFromWalletCtrl(payload);

    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(data, 'Successful transfer!');
  }

  async getWalletTransactions(req, res) {
    const walletId = req.params.walletId;

    const transactions = await this.getWalletTransactionsCtrl(walletId);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(transactions, 'Wallet transactions fetched successfully!');
  }
}

module.exports = WalletController;
