const _ = require('lodash');
const fs = require('fs');

const config = {
  title: 'COMEM+ Web Dev',
  version: '2017-2018',
  repoUrl: 'https://github.com/MediaComem/comem-webdev',
  remark: {
    highlightLines: true,
    highlightSpans: true,
    countIncrementalSlides: false
  },
  subjectScripts: [
    'https://embed.runkit.com'
  ],
  publish: {
    gitUrl: 'git@github.com:MediaComem/comem-webdev-docs.git',
    baseUrl: 'https://mediacomem.github.io/comem-webdev-docs',
    branch: 'master',
    version: '2017-2018'
  }
};

// Load `config.local.js` if it exists
if (fs.existsSync('./config.local.js')) {
  _.merge(config, require('./config.local'));
}

module.exports = config;
