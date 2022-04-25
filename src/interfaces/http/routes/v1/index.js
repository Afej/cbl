const fs = require('fs');
const path = require('path');
const { Router } = require('express');

// eslint-disable-next-line no-underscore-dangle
const _require = require;

const router = Router();

// Automatically loads all your routes and export them
fs.readdirSync(__dirname)
  .filter(
    (file) => file !== path.basename(__filename) && path.extname(file) === '.js'
  )
  .forEach((file) => {
    const endpoint = `/${file.split('.js')[0]}`;
    const route = _require(path.join(__dirname, file));
    router.use(endpoint, route);
  });

module.exports = router;
