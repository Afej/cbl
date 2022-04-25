const HttpStatus = require('http-status-codes');
const BaseError = require('./BaseError');

class UnauthorizedError extends BaseError {
  constructor(
    message = 'Authorization is required to access this API endpoint.',
    status = HttpStatus.UNAUTHORIZED,
    data
  ) {
    super(message, status, data);
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
