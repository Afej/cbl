require('module-alias/register');

/**
 * Runs the application
 */
const App = require('./App');
const container = require('./container');

const app = new App(container.cradle);

app.start();

process.on('SIGINT', app.shutdown.bind(app));

process.on('SIGTERM', app.shutdown.bind(app));
