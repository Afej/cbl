const express = require('express');
const { makeInvoker } = require('awilix-express');

const router = express.Router();

const AuthController = require('controllers/AuthController');
const api = makeInvoker(AuthController);

const Auth = require('middleware/protect');
const authApi = makeInvoker(Auth);

router.post('/login', api('login'));
router.get('/logout', api('logout'));
router.get('/me', authApi('protect'), api('getLoggedInUser'));

module.exports = router;
