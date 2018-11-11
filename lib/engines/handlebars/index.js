const BaseEngine = require('./../BaseEngine');
const Handlebars = require('handlebars');

class HandlebarsEngine extends BaseEngine {
  render(template, context) {
    const render = Handlebars.compile(template);
    return render(context);
  }
}

module.exports = HandlebarsEngine;
