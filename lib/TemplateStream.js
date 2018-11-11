const { Transform } = require('stream');
const EjsEngine = require('./engines/ejs');
const Es6Engine = require('./engines/es6');
const HandlebarsEngine = require('./engines/handlebars');

function createTemplateEngine(engine) {
  if (engine === 'ejs') {
    return new EjsEngine();
  }
  if (engine === 'es6') {
    return new Es6Engine();
  }
  if (engine === 'handlebars') {
    return new HandlebarsEngine();
  }

  throw `unsupported engine ${engine}`;
}

const defaultOptions = {
  engine: 'ejs'
};

class TemplateStream extends Transform {
  constructor(templateOptions) {
    super();

    if (!templateOptions || !templateOptions.context) {
      throw `context must be pass in options`;
    }

    const options = Object.assign({}, defaultOptions, templateOptions);

    this.engine = createTemplateEngine(options.engine);
    this.context = options.context;
  }
  _transform(chunk, encoding, callback) {
    try {
      this.push(this.engine.render(chunk.toString(), this.context));
      callback();
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = TemplateStream;
