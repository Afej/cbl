const express = require('express');
const { makeInvoker } = require('awilix-express');

const UsersController = require('controllers/UsersController');
const api = makeInvoker(UsersController);

// const User = require('models/User');

const router = express.Router({ mergeParams: true });

// const advancedResults = require('middleware/advancedResults');
// const { protect, authorize } = require('middleware/auth');

// router.use(protect);
// router.use(authorize('admin'));

// router
//   .route('/')
//   .get(
//     advancedResults(User, {
//       path: 'wallet',
//       select: 'balance',
//     }),
//     getUsers
//   )
//   .post(api('createUser'));

router.route('/').get(api('getUsers')).post(api('createUser'));

router
  .route('/:id')
  .get(api('getUser'))
  .put(api('updateUser'))
  .delete(api('deleteUser'));

module.exports = router;
