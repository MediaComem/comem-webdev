const _ = require('lodash');
const cp = require('child_process');
const fs = require('fs');

// Fixed options that cannot be overriden
const fixedOptions = {
  root: __dirname,
  title: 'COMEM+ Web Dev',
  version: '2017',
  repoUrl: 'https://github.com/MediaComem/comem-webdev',
  webfonts: true,
  remark: {
    highlightLines: true,
    highlightSpans: true,
    countIncrementalSlides: false
  }
};

// Options from environment variables
const envOptions = {
  browser: process.env.BROWSER,
  buildDir: process.env.BUILD_DIR,
  liveReloadPort: process.env.LIVERELOAD_PORT,
  pdfBuildDir: process.env.PDF_BUILD_DIR,
  port: process.env.PORT,
  sourceVersion: process.env.SOURCE_VERSION,
  webUrl: process.env.WEB_URL
};

// Options from local.config.js (if present)
let localFileOptions = {};
if (fs.existsSync('./local.config.js')) {
  localFileOptions = require('./local.config');
}

// Default options
const defaultOptions = {
  buildDir: 'build',
  liveReloadPort: 35729,
  pdfBuildDir: 'pdf',
  port: 3000,
  sourceVersion: cp.execSync('git rev-parse --abbrev-ref HEAD', { cwd: __dirname }).toString().trim(),
  webUrl: 'https://mediacomem.github.io/comem-webdev-docs'
};

module.exports = _.merge({}, defaultOptions, localFileOptions, envOptions, fixedOptions);
