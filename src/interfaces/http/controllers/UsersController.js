const { pick } = require('lodash');
const BaseController = require('./BaseController');

class UsersController extends BaseController {
  constructor({ createUser, deleteUser, getAllUsers, getUser, updateUser }) {
    super();
    this.createUserCtrl = createUser;
    this.deleteUserCtrl = deleteUser;
    this.getAllUsersCtrl = getAllUsers;
    this.getUserCtrl = getUser;
    this.updateUserCtrl = updateUser;
  }

  async createUser(req, res) {
    const payload = pick(req.body, [
      'first_name',
      'last_name',
      'email',
      'password',
    ]);
    const response = await this.createUserCtrl(payload);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(response, 'User created successfully!');
  }

  async getAllUsers(req, res) {
    const users = await this.getAllUsersCtrl();
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(users, 'Successfully fetched all users');
  }

  async getUser(req, res) {
    const { id } = req.params;
    const user = await this.getUserCtrl(id);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(user, 'Successfully fetched user');
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const payload = req.body;
    const user = await this.updateUserCtrl(id, payload);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(user, 'Successfully updated user');
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await this.deleteUserCtrl(id);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(user, 'Successfully deleted user');
  }
}

module.exports = UsersController;
