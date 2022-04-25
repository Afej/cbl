const HttpStatus = require('http-status-codes');
const BaseError = require('./BaseError');

class ForbiddenError extends BaseError {
  constructor(
    message = 'You do not have permission to access this API endpoint.',
    status = HttpStatus.FORBIDDEN,
    data
  ) {
    super(message, status, data);
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
