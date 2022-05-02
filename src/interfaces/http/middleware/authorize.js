const ErrorResponse = require('utils/errorResponse');

/**
 * Checks that the user making a request has the appropriate role
 * @param {String} role - Required role
 */
const authorize = ({ currentUser }) => {
  return {
    user: (req, res, next) => {
      if (currentUser.role !== 'user') {
        return next(
          new ErrorResponse(
            `User role \'${currentUser.role}'\ is not authorized to access this route`,
            403
          )
        );
      }
      next();
    },
    admin: (req, res, next) => {
      if (currentUser.role !== 'admin') {
        return next(
          new ErrorResponse(
            `User role \'${currentUser.role}'\ is not authorized to access this route`,
            403
          )
        );
      }
      next();
    },
  };
};

module.exports = authorize;
