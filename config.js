const _ = require('lodash');
const fs = require('fs');

// Fixed options that cannot be overriden
const fixedOptions = {
  root: __dirname,
  title: 'COMEM+ Web Dev',
  repoUrl: 'https://github.com/MediaComem/comem-webdev',
  webfonts: true,
  webUrl: 'https://mediacomem.github.io/comem-webdev-docs'
};

// Options from environment variables
const envOptions = {
  browser: process.env.BROWSER,
  buildDir: process.env.BUILD_DIR,
  liveReloadPort: process.env.LIVERELOAD_PORT,
  pdfBuildDir: process.env.PDF_BUILD_DIR,
  port: process.env.PORT,
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
  port: 3000
};

module.exports = _.defaults({}, fixedOptions, envOptions, localFileOptions, defaultOptions);
