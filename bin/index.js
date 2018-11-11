#!/usr/bin/env node

const program = require('commander');
const yaml = require('js-yaml');
const fs = require('fs');
const shortid = require('shortid');

const createTemplateStream = require('./../lib');

program
  .version('1.0.0')
  .description('Template utilities')
  .option('-f --file <file>', 'Template input file')
  .option('-o --output <output>', 'Output file')
  .option('-e --engine <engine>', 'Template engine', /^(ejs|es6|handlebars)$/i, 'ejs')
  .option('-c --context <context>', 'Template context for interpolation in JSON', '{}')
  .option('--context-file <contextFile>', 'Load context from file')
  .option('--context-format <contextFormat>', 'Context format', /^(json|yaml)$/i, 'json')
  .option('--use-env', 'Merge environment variable in context')
  .parse(process.argv);

function parseRawContext(raw) {
  if (program.contextFormat === 'json') {
    return JSON.parse(raw);
  }

  return yaml.safeLoad(raw);
}

function buildContext() {
  let rawContext = program.context;
  if (program.contextFile) {
    rawContext = fs.readFileSync(program.contextFile, 'utf8');
  }

  const context = Object.assign({ id: shortid.generate() }, parseRawContext(rawContext));

  if (program.useEnv) {
    return Object.assign({}, process.env, context);
  }

  return context;
}

function getInputStream() {
  if (program.file) {
    return fs.createReadStream(program.file, { encoding: 'utf8' });
  }

  process.stdin.setEncoding('utf8');
  return process.stdin;
}

function getOutputStream() {
  if (program.output) {
    return fs.createWriteStream(program.output, { encoding: 'utf8' });
  }

  return process.stdout;
}

getInputStream()
  .pipe(
    createTemplateStream({
      engine: program.engine,
      context: buildContext()
    })
  )
  .pipe(getOutputStream())
  .on('error', err => {
    console.err(err);
  });
