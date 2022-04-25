/**
 * Automatically loads all models and exports them
 */
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-underscore-dangle
const _require = require;

const getModel = (file) => _require(path.join(__dirname, file));
const models = {};

fs.readdirSync(__dirname)
  .filter(
    (file) => file !== path.basename(__filename) && path.extname(file) === '.js'
  )
  .forEach((file) => {
    // console.log(file);
    const model = getModel(file);
    // console.log(model.modelName);
    models[model.modelName] = model;
  });

module.exports = models;
