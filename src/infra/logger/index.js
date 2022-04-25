// Feel free to implement a custom logger that fulfils your need e.g EFK stack, ELK
/**
 * @module lib/logger
 * @description Configures a custom logger for logging errors, and results of certain operations.
 */

const winston = require('winston');
const { format } = require('winston');

const logger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: format.combine(
        winston.format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.simple()
      ),
    }),
  ],
  // Stores all uncaught exceptions
  exceptionHandlers: [
    new winston.transports.Console({
      format: format.combine(
        winston.format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.simple()
      ),
    }),
  ],
});

module.exports = logger;
