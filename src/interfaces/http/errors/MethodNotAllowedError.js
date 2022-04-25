const HttpStatus = require('http-status-codes');
const BaseError = require('./BaseError');

class MethodNotAllowedError extends BaseError {
  constructor(
    message = 'method not allowed',
    status = HttpStatus.METHOD_NOT_ALLOWED,
    data
  ) {
    super(message, status, data);
    this.name = 'MethodNotAllowedError';
  }
}

module.exports = MethodNotAllowedError;
