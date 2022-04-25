const HttpStatus = require('http-status-codes');
const BaseError = require('./BaseError');

class InvalidPayloadError extends BaseError {
  constructor(
    message = 'Provided payload is invalid',
    status = HttpStatus.BAD_REQUEST,
    data
  ) {
    super(message, status, data);
    this.name = 'InvalidPayloadError';
  }
}

module.exports = InvalidPayloadError;
