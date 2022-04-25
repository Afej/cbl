const {
  createContainer,
  asClass,
  InjectionMode,
  Lifetime,
  asFunction,
  asValue,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');
const config = require('config');
const mongoDB = require('infra/database/db');
const mongodbModels = require('infra/database/models');
const logger = require('infra/logger');
const routes = require('interfaces/http/routes/router');
const httpServer = require('interfaces/http/Server');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  config: asValue(config),
  db: asFunction(mongoDB).singleton(),
  models: asValue(mongodbModels),
  logger: asValue(logger),
  containerMiddleware: asValue(scopePerRequest(container)),
  routes: asFunction(routes),
  httpServer: asClass(httpServer),
  currentUser: asValue(null),
});

container.loadModules(
  [
    // Load use-cases
    [
      'app/**/*!(index.js).js',
      {
        lifetime: Lifetime.SCOPED,
        register: asFunction,
      },
    ],
    // Load repositories
    [
      'infra/repositories/**/*.js',
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {},
    cwd: __dirname,
  }
);

container.loadModules(
  [
    // Load entities
    [
      'domain/entities/*!(index.js).js',
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    resolverOptions: {},
    cwd: __dirname,
  }
);

module.exports = container;
