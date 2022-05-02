const express = require('express');
const { makeInvoker } = require('awilix-express');

// const Transaction = require('models/Transaction');
// const advancedResults = require('middleware/advancedResults');

const WalletController = require('controllers/WalletController');
const wallet_api = makeInvoker(WalletController);

const TransactionController = require('controllers/TransactionController');
const transaction_api = makeInvoker(TransactionController);

const Auth = require('middleware/protect');
const authApi = makeInvoker(Auth);

const authorize = require('middleware/authorize');
const authorizeApi = makeInvoker(authorize);

const router = express.Router({ mergeParams: true });

router.use(authApi('protect'));

router.route('/').get(authorizeApi('user'), wallet_api('getWallet'));
router.route('/deposit').post(authorizeApi('user'), wallet_api('deposit'));
router.route('/withdraw').post(authorizeApi('user'), wallet_api('withdraw'));
router
  .route('/transfer')
  .post(authorizeApi('user'), wallet_api('transferFromWallet'));
router
  .route('/:walletId/transactions')
  .get(authorizeApi('user'), wallet_api('getWalletTransactions'));

// router
//   .route('/transactions')
//   .get(authorizeApi('admin'), advancedResults(Transaction), getAllTransactions);

router
  .route('/transactions')
  .get(authorizeApi('admin'), transaction_api('getAllTransactions'));

router
  .route('/transactions/:transactionId')
  .get(authorizeApi('admin'), transaction_api('getTransaction'))
  .put(authorizeApi('admin'), transaction_api('reverseTransaction'));

module.exports = router;
