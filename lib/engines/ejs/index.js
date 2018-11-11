const BaseEngine = require('./../BaseEngine');
const ejs = require('ejs');

class EjsEngine extends BaseEngine {
  render(template, context) {
    return ejs.render(template, context);
  }
}

module.exports = EjsEngine;
