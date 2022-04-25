const { Router } = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const v1Routes = require('./v1');
const errorHandler = require('middleware/error');

// import errorHandler from 'interfaces/http/middleware/errorHandler';
const error404 = require('interfaces/http/middleware/notFoundHandler');

module.exports = ({ config, containerMiddleware }) => {
  const router = Router();
  router.use(helmet());
  const NODE_ENV = config.get('app.env');
  router.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

  const bodyLimit = config.get('app.bodyLimit');

  router.use(
    bodyParser.json({
      limit: bodyLimit,
    })
  );

  router.use(bodyParser.urlencoded({ extended: false, limit: bodyLimit }));

  // Body parser
  //   router.use(express.json());

  // Cookie parser
  router.use(cookieParser());

  // Sanitize data
  router.use(mongoSanitize());

  // Set security headers
  router.use(helmet());

  // Prevent XSS attacks
  router.use(xss());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
  });

  router.use(limiter);

  // Prevent http param pollution
  router.use(hpp());

  // Setup CORS
  const allowedOrigins = config.get('app.allowedOrigins');
  router.use(
    cors({
      origin: (origin, cb) => {
        if (allowedOrigins.trim() === '*') {
          cb(null, true);
        } else {
          const origins = allowedOrigins.split(',');
          if (origins.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
          } else {
            cb(new Error(`Origin('${origin}') not allowed`, false));
          }
        }
      },
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    })
  );

  // https://www.npmjs.com/package/awilix-express
  router.use(containerMiddleware);

  router.get('/', (req, res) =>
    res.json({
      message: 'Central Bank of Learnable API using Clean Architecture',
    })
  );

  router.use('/api/v1', v1Routes);

  router.use(error404);

  router.use(errorHandler);

  return router;
};
