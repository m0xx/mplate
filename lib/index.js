const TemplateStream = require('./TemplateStream');

function createTemplateStream(options) {
  return new TemplateStream(options);
}

module.exports = createTemplateStream;
