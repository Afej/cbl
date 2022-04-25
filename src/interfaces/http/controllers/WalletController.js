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
    this.deposit = deposit;
    this.withdraw = withdraw;
    this.getWallet = getWallet;
    this.getWalletTransactions = getWalletTransactions;
    this.transferFromWallet = transferFromWallet;
  }

  async getWallet(req, res) {
    const wallet = await this.getWallet();
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(wallet, 'Wallet fetched successfully!');
  }

  async deposit(req, res) {
    const { amount } = req.body;

    const wallet = await this.deposit(amount);
    return this.responseBuilder.onSuccess(res, 'Successful deposit!', wallet);
  }

  async withdraw(req, res) {
    const { amount } = req.body;

    const wallet = await this.withdraw(amount);
    return this.responseBuilder.onSuccess(
      res,
      'Successful withdrawal!',
      wallet
    );
  }

  async transferFromWallet(req, res) {
    const payload = pick(req.body, ['amount', 'receiver_email']);

    const data = await this.transferFromWallet(payload);
    return this.responseBuilder.onSuccess(res, 'Successful transfer!', data);
  }

  async getWalletTransactions(req, res) {
    const walletId = req.params.walletId;

    const transactions = await this.getWalletTransactions(walletId);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(transactions, 'Wallet transactions fetched successfully!');
  }
}

module.exports = WalletController;
