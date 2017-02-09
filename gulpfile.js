var _ = require('lodash'),
    chain = require('gulp-chain'),
    fs = require('fs'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    del = require('del'),
    doctoc = require('gulp-doctoc'),
    handlebars = require('handlebars'),
    markdown = require('gulp-markdown'),
    MarkdownModel = require('./lib/markdown-model'),
    open = require('gulp-open'),
    path = require('path'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    through = require('through2'),
    util = require('gulp-util'),
    watch = require('gulp-watch');

var root = __dirname,
    buildDir = process.env.BUILD_DIR || 'build';

var config = {
  port: process.env.PORT,
  liveReloadPort: process.env.LIVERELOAD_PORT
};

try {
  _.defaults(config, require('./config'));
} catch (e) {
  // ignore
}

_.defaults(config, {
  port: 3000,
  liveReloadPort: 35729
});

var src = {
  assets: [ 'subjects/**/*.*', '!**/*.md', '!**/*.odg', '!**/*.odg#' ],
  indexTemplate: 'templates/index.html',
  mainReadme: 'README.md',
  remarkTemplate: 'templates/remark.html',
  slides: 'subjects/**/*.md'
};

var indexPageTemplate = loadIndexPageTemplate(),
    remarkPageTemplate = loadRemarkPageTemplate();

gulp.task('build-assets', function() {
  return gulp
    .src(src.assets)
    .pipe(copyAssets());
});

gulp.task('build-index', function() {
  return buildIndex();
});

gulp.task('build-slides', function() {
  return gulp
    .src(src.slides)
    .pipe(buildSlides());
});

gulp.task('build', [ 'build-assets', 'build-index', 'build-slides' ]);

gulp.task('clean', function() {
  return del([ 'build' ]);
});

gulp.task('doctoc', function() {
  return gulp
    .src(src.slides)
    .pipe(doctoc({
      depth: 3,
      notitle: true,
      mode: 'github.com'
    }))
    .pipe(gulp.dest('subjects'));
});

gulp.task('open', function() {
  gulp
    .src(__filename)
    .pipe(open({
      app: config.browser,
      uri: 'http://localhost:' + config.port
    }));
});

gulp.task('serve', function() {
  return connect.server({
    root: buildDir,
    livereload: {
      port: config.liveReloadPort
    },
    port: config.port
  });
});

gulp.task('watch-assets', function() {
  return watch(src.assets, function(file) {
    return gulp
      .src(file.path, { base: 'subjects' })
      .pipe(copyAssets());
  });
});

gulp.task('watch-index', function() {
  return watch(src.mainReadme, function() {
    return buildIndex();
  });
});

gulp.task('watch-index-template', function() {
  return watch(src.indexTemplate, function() {
    indexPageTemplate = loadIndexPageTemplate();
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
    remarkPageTemplate = loadRemarkPageTemplate();
    return gulp
      .src(src.slides)
      .pipe(buildSlides());
  });
});

gulp.task('watch', function() {
  return runSequence([ 'watch-assets', 'watch-index', 'watch-index-template', 'watch-slides', 'watch-slides-template' ]);
});

gulp.task('default', function() {
  return runSequence('clean', 'build', [ 'serve', 'watch'], 'open');
});

function buildIndex() {
  var dest = buildDir;
  return gulp
    .src(src.mainReadme)
    .pipe(markdown())
    .pipe(rename(renameReadmeToIndex))
    .pipe(through.obj(insertIntoIndexPage))
    .pipe(logFile(function(file) {
      var relativePath = path.relative(root, file.path);
      util.log('Generated ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
};

var buildSlides = chain(function(stream) {
  var dest = path.join(buildDir, 'subjects');
  return stream
    .pipe(through.obj(convertMarkdownFileToRemarkSlides))
    .pipe(rename(renameReadmeToIndex))
    .pipe(logFile(function(file) {
      var relativePath = path.relative('subjects', file.path);
      util.log('Generated ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
});

var copyAssets = chain(function(stream) {
  var dest = path.join(buildDir, 'subjects');
  return stream
    .pipe(logFile(function(file) {
      var relativePath = path.relative('subjects', file.path);
      util.log('Copied ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
});

function loadIndexPageTemplate() {
  return handlebars.compile(fs.readFileSync(src.indexTemplate, { encoding: 'utf-8' }));
}

function loadRemarkPageTemplate() {
  return handlebars.compile(fs.readFileSync(src.remarkTemplate, { encoding: 'utf-8' }));
}

function logFile(func) {
  return through.obj(function(file, enc, callback) {
    func(file);
    this.push(file);
    callback();
  });
}

function renameReadmeToIndex(path) {
  path.basename = 'index';
  path.extname = '.html';
}

function insertIntoIndexPage(file, enc, callback) {

  var contents = file.contents.toString();

  var indexPage = indexPageTemplate({
    contents: contents
  });

  file.contents = new Buffer(indexPage);
  this.push(file);

  callback();
}

function convertMarkdownFileToRemarkSlides(file, enc, callback) {

  var markdown = file.contents.toString();
  var model = new MarkdownModel(markdown);

  var remarkPage = remarkPageTemplate({
    source: model.transform()
  });

  file.contents = new Buffer(remarkPage);
  this.push(file);

  callback();
}
