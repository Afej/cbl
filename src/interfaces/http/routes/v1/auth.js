const express = require('express');
const { makeInvoker } = require('awilix-express');

const router = express.Router();

const AuthController = require('controllers/AuthController');
const api = makeInvoker(AuthController);

const Auth = require('middleware/auth');
const protectApi = makeInvoker(Auth);

router.post('/login', api('login'));
router.get('/logout', api('logout'));
router.get('/me', protectApi('protect'), api('getLoggedInUser'));

module.exports = router;
