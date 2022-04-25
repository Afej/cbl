/* eslint-disable no-unused-vars */
const NotImplementedError = require('../errors/NotImplementedError');
const ResponseBuilder = require('../response/ResponseBuilder');

class BaseController {
  constructor() {
    if (new.target === BaseController) {
      throw new TypeError('Cannot construct BaseController instances directly');
    }
    this.responseBuilder = ResponseBuilder;
  }

  getAll(req, res) {
    throw new NotImplementedError();
  }

  getOne(req, res) {
    throw new NotImplementedError();
  }

  create(req, res) {
    throw new NotImplementedError();
  }

  update(req, res) {
    throw new NotImplementedError();
  }

  remove(req, res) {
    throw new NotImplementedError();
  }
}

module.exports = BaseController;
