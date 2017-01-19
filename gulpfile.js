var _ = require('lodash'),
    chain = require('gulp-chain'),
    clean = require('gulp-clean'),
    fs = require('fs'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    handlebars = require('handlebars'),
    markdown = require('gulp-markdown'),
    MarkdownModel = require('./lib/markdown-model'),
    markdownPdf = require('gulp-markdown-pdf'),
    path = require('path'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    through = require('through2'),
    util = require('gulp-util'),
    watch = require('gulp-watch');

var root = __dirname,
    indexPageTemplate = loadIndexPageTemplate(),
    remarkPageTemplate = loadRemarkPageTemplate();

var buildDir = process.env.BUILD_DIR || 'build';

gulp.task('build-assets', function() {
  return gulp
    .src([ 'subjects/**/*.*', '!**/*.md' ])
    .pipe(copyAssets());
});

gulp.task('build-index', function() {
  return buildIndex();
});

gulp.task('build-slides', function() {
  return gulp
    .src('subjects/**/*.md')
    .pipe(buildSlides());
});

gulp.task('build-pdf', function() {
  var dest = path.join(buildDir, 'subjects');
  return gulp
    .src('subjects/**/*.md')
    .pipe(markdownPdf())
    .pipe(gulp.dest(dest));
});

gulp.task('build', [ 'build-assets', 'build-index', 'build-slides' ]);

gulp.task('clean', function() {
  return gulp
    .src('build/**/*', { read: false })
    .pipe(clean());
});

gulp.task('serve', function() {
  return connect.server({
    root: buildDir,
    port: process.env.PORT || 3000
  });
});

gulp.task('watch-assets', function() {
  return watch([ 'subjects/**/*.*', '!**/*.md' ], function(file) {
    return gulp
      .src(file.path, { base: 'subjects' })
      .pipe(copyAssets());
  });
})

gulp.task('watch-index', function() {
  return watch('README.md', function() {
    return buildIndex();
  });
})

gulp.task('watch-index-template', function() {
  return watch('templates/index.html', function() {
    indexPageTemplate = loadIndexPageTemplate();
    return buildIndex();
  });
})

gulp.task('watch-slides', function() {
  return watch('subjects/**/*.md', function(file) {
    return gulp.src(file.path, { base: 'subjects' })
      .pipe(buildSlides());
  });
});

gulp.task('watch-slides-template', function() {
  return watch('templates/remark.html', function() {
    remarkPageTemplate = loadRemarkPageTemplate();
    return gulp.src('subjects/**/*.md')
      .pipe(buildSlides());
  });
});

gulp.task('watch', function() {
  return runSequence([ 'watch-assets', 'watch-index', 'watch-index-template', 'watch-slides', 'watch-slides-template' ]);
});

gulp.task('default', function() {
  return runSequence('clean', 'build', [ 'serve', 'watch']);
});

function buildIndex() {
  var dest = buildDir;
  return gulp.src('README.md')
    .pipe(markdown())
    .pipe(rename(renameReadmeToIndex))
    .pipe(through.obj(insertIntoIndexPage))
    .pipe(logFile(function(file) {
      var relativePath = path.relative(root, file.path);
      util.log('Generated ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest));
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
    .pipe(gulp.dest(dest));
});

var copyAssets = chain(function(stream) {
  var dest = path.join(buildDir, 'subjects');
  return stream
    .pipe(logFile(function(file) {
      var relativePath = path.relative('subjects', file.path);
      util.log('Copied ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest));
});

function loadIndexPageTemplate() {
  return handlebars.compile(fs.readFileSync('templates/index.html', { encoding: 'utf-8' }));
}

function loadRemarkPageTemplate() {
  return handlebars.compile(fs.readFileSync('templates/remark.html', { encoding: 'utf-8' }));
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
