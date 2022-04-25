const express = require('express');
const http = require('http');
// const path = require('path');

/**
 * Creates and configures a HTTP server
 */
class HttpServer {
  constructor({ config, routes, logger }) {
    const app = express();
    app.disable('x-powered-by');
    // URL for API documentation
    // app.use(
    //   '/rest-docs',
    //   express.static(path.resolve(__dirname, '../../../docs/apidocs/'))
    // );
    app.use(routes);
    this.server = http.createServer(app);
    this.config = config;
    this.logger = logger;
  }

  async start() {
    const port = this.config.get('app.httpPort');
    const serviceName = this.config.get('app.serviceName');
    const serviceVersion = this.config.get('app.serviceVersion');
    return this.server.listen(port, () => {
      this.logger.info(
        `REST server for ${serviceName} v${serviceVersion} listening on port ${port}`
      );
    });
  }

  close(cb) {
    return this.server.close(cb);
  }
}

module.exports = HttpServer;
