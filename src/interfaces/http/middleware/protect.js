const jwt = require('jsonwebtoken');
const { asValue, Lifetime } = require('awilix');
const ErrorResponse = require('utils/errorResponse');


class Auth {
  constructor({ userRepository, config, currentUser }) {
    this.userRepository = userRepository;
    this.config = config;
    this.currentUser = currentUser;
  }

  // Protect routes
  async protect(req, res, next) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(' ')[1];
      // console.log('bearer token:', token);
    }
    // else if (req.cookies.token) {
    //   // Set token from cookie
    //   token = req.cookies.token;
    // }

    // Make sure token exists
    if (!token) {
      console.log('no token');
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }

    try {
      // Verify token
      const jwt_secret = this.config.get('app.jwtSecret');
      const decoded = jwt.verify(token, jwt_secret);

      const user = await this.userRepository.findById(decoded.user_id);

      req.container.register({
        currentUser: asValue(user, { lifetime: Lifetime.SCOPED }),
      });

      next();
    } catch (err) {
      console.log('error ', err);
      return next(
        new ErrorResponse('Not authorized to access this route', 401)
      );
    }
  }
}

module.exports = Auth;
