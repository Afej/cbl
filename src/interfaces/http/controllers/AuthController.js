const { pick } = require('lodash');
const BaseController = require('./BaseController');

class AuthController extends BaseController {
  constructor({ login, getLoggedInUser }) {
    super();
    this.loginUser = login;
    this.getLoggedUser = getLoggedInUser;
  }

  async login(req, res) {
    const payload = pick(req.body, ['email', 'password']);

    const response = await this.loginUser(payload);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(response, 'Log in successful!');
  }

  async getLoggedInUser(req, res) {
    const user = await this.getLoggedUser();
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(user, 'Successfully fetched user');
  }
}

module.exports = AuthController;
