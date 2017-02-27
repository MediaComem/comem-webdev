const _ = require('lodash');
const chain = require('gulp-chain');
const fs = require('fs');
const gulp = require('gulp');
const connect = require('gulp-connect');
const del = require('del');
const doctoc = require('gulp-doctoc');
const handlebars = require('handlebars');
const markdown = require('gulp-markdown');
const md2remark = require('md2remark');
const open = require('gulp-open');
const path = require('path');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const through = require('through2');
const util = require('gulp-util');
const watch = require('gulp-watch');

const config = require('./config');
const generatePdfFromSlides = require('./pdf');

const src = {
  assets: [ 'assets/**/*.*' ],
  content: [ 'subjects/**/*.*', '!**/*.md', '!**/*.odg', '!**/*.odg#', '!**/node_modules/**' ],
  doctoc: [ 'README.md', 'CONTRIBUTING.md', 'GIT-CHEATSHEET.md', 'subjects/**/*.md', '!subjects/**/node_modules/**/*.md' ],
  indexTemplate: 'templates/index.html',
  mainReadme: 'README.md',
  pdfSource: 'tmp/pdf/subjects/*/**/index.html',
  remarkTemplate: 'templates/remark.html',
  slides: [ 'subjects/**/*.md', '!subjects/**/node_modules/**/*.md' ]
};

let cachedIndexPageTemplate, cachedRemarkPageTemplate;

gulp.task('build-assets', function() {
  return gulp
    .src(src.assets)
    .pipe(copyAssets());
});

gulp.task('build-content', function() {
  return gulp
    .src(src.content)
    .pipe(copyContent());
});

gulp.task('build-index', function() {
  return buildIndex();
});

gulp.task('build-slides', function() {
  return gulp
    .src(src.slides)
    .pipe(buildSlides());
});

gulp.task('build', [ 'build-assets', 'build-content', 'build-index', 'build-slides' ]);

gulp.task('clean-build', function() {
  return del([ 'build' ]);
});

gulp.task('clean-pdf', function() {
  return del([ 'tmp/pdf' ]);
});

gulp.task('clean', function() {
  return runSequence([ 'clean-build', 'clean-pdf' ]);
});

gulp.task('doctoc', function() {
  return gulp
    .src(src.doctoc, { base: '.' })
    .pipe(doctoc({
      depth: 3,
      notitle: true,
      mode: 'github.com'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('generate-pdf', [ 'build' ], function() {
  return gulp
    .src(src.pdfSource)
    .pipe(generatePdf());
});

gulp.task('open', function() {
  gulp
    .src(__filename)
    .pipe(open({
      app: config.browser,
      uri: 'http://localhost:' + config.port
    }));
});

gulp.task('pdf', function() {
  config.buildDir = 'tmp/pdf';
  config.webfonts = false;
  return runSequence('clean-pdf', 'generate-pdf', 'clean-pdf');
});

gulp.task('serve', function() {
  return connect.server({
    root: config.buildDir,
    livereload: {
      port: config.liveReloadPort
    },
    port: config.port
  });
});

gulp.task('watch-assets', function() {
  return watch(src.assets, function(file) {
    return gulp
      .src(file.path, { base: 'assets' })
      .pipe(copyAssets());
  });
});

gulp.task('watch-content', function() {
  return watch(src.content, function(file) {
    return gulp
      .src(file.path, { base: 'subjects' })
      .pipe(copyContent());
  });
});

gulp.task('watch-index', function() {
  return watch(src.mainReadme, function() {
    return buildIndex();
  });
});

gulp.task('watch-index-template', function() {
  return watch(src.indexTemplate, function() {
    cachedIndexPageTemplate = null;
    return buildIndex();
  });
});

gulp.task('watch-slides', function() {
  return watch(src.slides, function(file) {
    return gulp
      .src(file.path, { base: 'subjects' })
      .pipe(buildSlides());
  });
});

gulp.task('watch-slides-template', function() {
  return watch(src.remarkTemplate, function() {
    cachedRemarkPageTemplate = null;
    return gulp
      .src(src.slides)
      .pipe(buildSlides());
  });
});

gulp.task('watch', function() {
  return runSequence([ 'watch-assets', 'watch-content', 'watch-index', 'watch-index-template', 'watch-slides', 'watch-slides-template' ]);
});

gulp.task('default', function() {
  return runSequence('clean-build', 'build', [ 'serve', 'watch'], 'open');
});

function buildIndex() {
  const dest = config.buildDir;
  return gulp
    .src(src.mainReadme)
    .pipe(markdown())
    .pipe(rename(renameMarkdownToHtml))
    .pipe(through.obj(insertIntoIndexPage))
    .pipe(logFile(function(file) {
      const relativePath = path.relative(config.root, file.path);
      util.log('Generated ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
};

const buildSlides = chain(function(stream) {
  const dest = path.join(config.buildDir, 'subjects');
  return stream
    .pipe(through.obj(convertMarkdownFileToRemarkSlides))
    .pipe(logFile(function(file) {
      const relativePath = path.relative('subjects', file.path);
      util.log('Generated ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
});

const copyContent = chain(function(stream) {
  const dest = path.join(config.buildDir, 'subjects');
  return stream
    .pipe(logFile(function(file) {
      const relativePath = path.relative('subjects', file.path);
      util.log('Copied ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
});

const copyAssets = chain(function(stream) {
  const dest = path.join(config.buildDir, 'assets');
  return stream
    .pipe(logFile(function(file) {
      const relativePath = path.relative('assets', file.path);
      util.log('Copied ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
});

const generatePdf = chain(function(stream) {
  const base = 'tmp/pdf/subjects';
  const dest = path.relative(__dirname, config.pdfBuildDir);
  return stream
    .pipe(through.obj((file, enc, callback) => {
      const relativePath = path.relative(base, file.path);
      const destPath = `${path.dirname(relativePath)}.pdf`;
      const pdfFile = path.join(config.pdfBuildDir, destPath);
      generatePdfFromSlides(file.path, pdfFile).then(() => {
        util.log(`Generated ${util.colors.magenta(pdfFile)}`);
        callback(undefined, file)
      }, callback);
    }));
});

function getIndexPageTemplate() {
  if (!cachedIndexPageTemplate) {
    cachedIndexPageTemplate = handlebars.compile(fs.readFileSync(src.indexTemplate, { encoding: 'utf-8' }));
  }

  return cachedIndexPageTemplate;
}

function getRemarkPageTemplate() {
  if (!cachedRemarkPageTemplate) {
    cachedRemarkPageTemplate = handlebars.compile(fs.readFileSync(src.remarkTemplate, { encoding: 'utf-8' }));
  }

  return cachedRemarkPageTemplate;
}

function logFile(func) {
  return through.obj(function(file, enc, callback) {
    func(file);
    callback(undefined, file);
  });
}

function renameMarkdownToHtml(file) {
  file.basename = 'index';
  file.extname = '.html';
}

function insertIntoIndexPage(file, enc, callback) {

  const templateFunc = getIndexPageTemplate();
  const indexPage = templateFunc({
    contents: file.contents.toString()
  });

  file.contents = new Buffer(indexPage);
  callback(undefined, file);
}

function convertMarkdownFileToRemarkSlides(file, enc, callback) {

  let markdown = file.contents.toString();
  const sourcePath = file.path;

  const basenameWithoutExt = path.basename(file.path, '.md');
  if (basenameWithoutExt == 'README') {
    // Convert subjects/a/b/c/README.md to subjects/a/b/c/index.html
    file.path = path.join(path.dirname(file.path), 'index.html');
  } else {
    // Convert subjects/a/b/c/INSTALL.md to subjects/a/b/c/install/index.html
    file.path = path.join(path.dirname(file.path), basenameWithoutExt.toLowerCase(), 'index.html');

    // Update relative Markdown links to take into account the new directory
    markdown = markdown
      .replace(/(\[[^\]]+\]\(\.\.\/)/g, '$1../') // "[foo](../something)" => "[foo](../../something)"
      .replace(/^(\[[^\]]+\]:\s*\.\.\/)/g, '$1../'); // "[foo]: ../something" => "[foo]: ../../something"
  }

  // Determine depth of Markdown file compared to subjects directory
  // (subjects/a/index.html has depth 1, subjects/a/b/index.html has depth 2, etc)
  let depth = 0;
  const subjectPath = path.relative('subjects', path.dirname(file.path));
  let currentPath = subjectPath;
  while (currentPath != '.') {
    depth++;
    currentPath = path.dirname(currentPath);
  }

  // Use the first Markdown header as the HTML <title>
  const subjectTitleMatch = markdown.match(/^#\s*([^\n]+)/m);
  const subjectTitle = subjectTitleMatch ? subjectTitleMatch[1] : 'Slides';

  const options = {
    breadcrumbs: true,
    file: sourcePath
  };

  // Convert the Markdown content to Remark Markdown
  md2remark(markdown, options).then(function(remarkMarkdown) {

    const templateFunc = getRemarkPageTemplate();

    const basePath = '../'.repeat(depth + 1).replace(/\/$/, '');
    const homeUrl = config.webUrl.replace(/([^\/])$/, '$1/');
    const sourceUrl = `${config.repoUrl}/tree/${config.sourceVersion}/subjects/${subjectPath}/`;
    const title = `${subjectTitle} (${config.title})`;

    // Get remark options from main configuration file
    const remarkOptions = _.cloneDeep(config.remark);

    // Override remark options per slide deck with subjects/*/remark.js configuration file (if present)
    const remarkOptionsOverrideFile = './' + path.join('subjects', subjectPath, 'remark');
    try {
      _.merge(remarkOptions, require(remarkOptionsOverrideFile));
    } catch(err) {
      if (fs.existsSync(remarkOptionsOverrideFile + '.js')) {
        throw err;
      }
    }

    // Insert the Remark Markdown into our HTML template
    const remarkPage = templateFunc({
      basePath: basePath,
      homeUrl: homeUrl,
      remarkOptions: JSON.stringify(remarkOptions),
      source: remarkMarkdown,
      sourceUrl: sourceUrl,
      title: title,
      webfonts: config.webfonts
    });

    file.contents = new Buffer(remarkPage);
    callback(undefined, file);
  });
}
