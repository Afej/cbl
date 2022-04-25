const express = require('express');
const { makeInvoker } = require('awilix-express');

// const Transaction = require('models/Transaction');

const WalletController = require('controllers/WalletController');
const TransactionController = require('controllers/TransactionController');

const wallet_api = makeInvoker(WalletController);
const transaction_api = makeInvoker(TransactionController);

const router = express.Router({ mergeParams: true });

// const advancedResults = require('middleware/advancedResults');
// const { protect, authorize } = require('middleware/auth');

// router.use(protect);

// router.route('/').get(authorize('user'), wallet_api('getWallet'));
// router.route('/deposit').post(authorize('user'), wallet_api('deposit'));
// router.route('/withdraw').post(authorize('user'), wallet_api('withdraw'));
// router
//   .route('/transfer')
//   .post(authorize('user'), wallet_api('transferFromWallet'));

// router
//   .route('/:walletId/transactions')
//   .get(authorize('user'), wallet_api('getWalletTransactions'));

// router
//   .route('/transactions')
//   .get(authorize('admin'), advancedResults(Transaction), getAllTransactions);

// router
//   .route('/transactions')
//   .get(authorize('admin'), transaction_api('getAllTransactions'));

// router
//   .route('/transactions/:transactionId')
//   .get(authorize('admin'), transaction_api('getTransaction'))
//   .put(authorize('admin'), transaction_api('reverseTransaction'));

module.exports = router;
