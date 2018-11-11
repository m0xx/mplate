const BaseEngine = require('./../BaseEngine');
const es6 = require('es6-template-strings');

class Es6Engine extends BaseEngine {
  render(template, context) {
    return es6(template, context);
  }
}

module.exports = Es6Engine;
