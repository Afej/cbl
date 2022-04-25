const HttpStatus = require('http-status-codes');
const BaseError = require('./BaseError');

class NotImplementedError extends BaseError {
  constructor(
    message = 'The requested resource/method has not been implemented',
    status = HttpStatus.NOT_IMPLEMENTED,
    data
  ) {
    super(message, status, data);
    this.name = 'NotImplementedError';
  }
}

module.exports = NotImplementedError;
