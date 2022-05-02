const express = require('express');
const { makeInvoker } = require('awilix-express');

// const User = require('models/User');
// const advancedResults = require('middleware/advancedResults');

const UsersController = require('controllers/UsersController');
const api = makeInvoker(UsersController);

const Auth = require('middleware/protect');
const authApi = makeInvoker(Auth);

const authorize = require('middleware/authorize');
const authorizeApi = makeInvoker(authorize);

const router = express.Router({ mergeParams: true });

router.use(authApi('protect'));
router.use(authorizeApi('admin'));

// router
//   .route('/')
//   .get(
//     advancedResults(User, {
//       path: 'wallet',
//       select: 'balance',
//     }),
//     api('getAllUsers')
//   )
//   .post(api('createUser'));

router.route('/').get(api('getAllUsers')).post(api('createUser'));

router
  .route('/:id')
  .get(api('getUser'))
  .put(api('updateUser'))
  .delete(api('deleteUser'));

module.exports = router;
