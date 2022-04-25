const { pick } = require('lodash');
const BaseController = require('./BaseController');

class UsersController extends BaseController {
  constructor({ createUser, deleteUser, getAllUsers, getUser, updateUser }) {
    super();
    this.createUser = createUser;
    this.deleteUser = deleteUser;
    this.getAllUsers = getAllUsers;
    this.getUser = getUser;
    this.updateUser = updateUser;
  }

  async createUser(req, res) {
    const payload = pick(req.body, [
      'first_name',
      'last_name',
      'email',
      'password',
    ]);
    const response = await this.createUser(payload);
    return this.responseBuilder
      .getResponseHandler(res)
      .onSuccess(response, 'User created successfully!');
  }

  async getAllUsers(req, res) {
    const users = await this.getAllUsers();
    return this.responseBuilder.onSuccess(
      res,
      'Successfully fetched all users',
      users
    );
  }

  async getUser(req, res) {
    const { id } = req.params.id;
    const user = await this.getUser(id);
    return this.responseBuilder.onSuccess(
      res,
      'Successfully fetched user',
      user
    );
  }

  async updateUser(req, res) {
    const { id } = req.params.id;
    const payload = req.body;
    const user = await this.updateUser(id, payload);
    return this.responseBuilder.onSuccess(
      res,
      'Successfully updated user',
      user
    );
  }

  async deleteUser(req, res) {
    const { id } = req.params.id;
    const user = await this.deleteUser(id);
    return this.responseBuilder.onSuccess(
      res,
      'Successfully deleted user',
      user
    );
  }
}

module.exports = UsersController;
