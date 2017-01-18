var _ = require('lodash'),
    chain = require('gulp-chain'),
    clean = require('gulp-clean'),
    fs = require('fs'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    handlebars = require('handlebars'),
    lodash = require('lodash'),
    markdown = require('gulp-markdown'),
    markdownPdf = require('gulp-markdown-pdf'),
    path = require('path'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    runSequence = require('run-sequence'),
    through = require('through2'),
    util = require('gulp-util'),
    watch = require('gulp-watch');

var root = __dirname,
    indexPageTemplate = loadIndexPageTemplate(),
    remarkPageTemplate = loadRemarkPageTemplate();

gulp.task('build-index', function() {
  return gulp.src('README.md')
    .pipe(buildIndex());
});

gulp.task('build-slides', function() {
  return gulp.src('subjects/**/README.md')
    .pipe(convertReadmeToRemarkSlides());
});

gulp.task('build-pdf', function() {
  return gulp.src('subjects/**/README.md')
    .pipe(markdownPdf())
    .pipe(gulp.dest('subjects'));
});

gulp.task('build', [ 'build-index', 'build-slides' ]);

gulp.task('clean', function() {
  return gulp.src('subjects/**/index.html', { read: false })
    .pipe(clean());
});

gulp.task('serve', function() {
  return connect.server({
    root: 'subjects',
    port: process.env.PORT || 3000
  });
});

gulp.task('watch-index', function() {
  return watch('README.md')
    .pipe(buildIndex());
})

gulp.task('watch-slides', function() {
  return watch('subjects/**/README.md', function(file) {
    return gulp.src(file.path, { base: 'subjects' })
      .pipe(convertReadmeToRemarkSlides());
  });
});

gulp.task('watch', function() {
  return runSequence([ 'watch-index', 'watch-slides' ]);
});

gulp.task('default', function() {
  return runSequence('clean', 'build', [ 'serve', 'watch']);
});

var buildIndex = chain(function(stream) {

  var dest = 'subjects';

  return stream
    .pipe(markdown())
    .pipe(rename(renameReadmeToIndex))
    .pipe(replace(/href=(["'])subjects\//g, 'href=$1'))
    .pipe(through.obj(insertIntoIndexPage))
    .pipe(logFile(function(file) {
      var relativePath = path.relative(root, file.path);
      util.log('Generated ' + util.colors.magenta(path.join(dest, relativePath)));
    }))
    .pipe(gulp.dest(dest));
});

var convertReadmeToRemarkSlides = chain(function(stream) {

  var dest = path.join('subjects');

  return stream
    .pipe(through.obj(convertMarkdownFileToRemarkSlides))
    .pipe(rename(renameReadmeToIndex))
    .pipe(logFile(function(file) {
      var relativePath = path.relative('subjects', file.path);
      util.log('Generated ' + util.colors.magenta(path.join(dest, relativePath)));
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
  markdown = enrichWithSlideSeparators(markdown);
  markdown = enrichWithUnsemanticColumns(markdown);

  var remarkPage = remarkPageTemplate({
    source: markdown
  });

  file.contents = new Buffer(remarkPage);
  this.push(file);

  callback();
}

function enrichWithSlideSeparators(markdown) {

  var titleRegexp = /^\#/mg,
      remarkSlideSeparator = '---',
      injection = remarkSlideSeparator + "\n";

  var titleIndices = [];

  var match;
  while (match = titleRegexp.exec(markdown)) {
    titleIndices.push(match.index);
  }

  // Omit first title.
  titleIndices.shift();

  var addedCharacters = 0;

  _.each(titleIndices, function(titleIndex) {
    titleIndex += addedCharacters;
    markdown = markdown.slice(0, titleIndex) + injection + markdown.slice(titleIndex);
    addedCharacters += injection.length;
  });

  return markdown;
}

function enrichWithUnsemanticColumns(markdown) {

  // Build an array containing each slide's Markdown content.
  var slides = markdown.split(/^---/mg);

  // This regular expression finds all <!-- slide-column NUMBER --> comments.
  var columnMarkerRegexp = /\<\!\-\-\s*slide-column\s+(\d+)\s*\-\-\>/mg;

  // Modify each slide...
  slides = _.map(slides, function(slide) {

    var columnMarkers = [];

    // Find all column markers.
    var match;
    while (match = columnMarkerRegexp.exec(slide)) {
      columnMarkers.push({
        index: match.index, // Index at which the comment starts
        percentage: match[1] // Column width in percents
      });
    }

    // Keep track of how many characters are added/removed from the slide.
    var addedCharacters = 0;

    _.each(columnMarkers, function(columnMarker, i) {

      // Determine at which index the slide-column comment starts and ends.
      var commentStartIndex = columnMarker.index += addedCharacters;
      var commentEndIndex = commentStartIndex + slide.slice(commentStartIndex).indexOf('-->') + 3;

      // Prepare the text that will replace the comment.
      // For example, ".grid-70[", to open a 70-percent wide column.
      var injection = '.grid-' + columnMarker.percentage + '[';
      if (i != 0) {
        // If this is not the first marker, prepend "]" to close the previous column.
        injection = "]\n" + injection;
      }

      // Replace the comment by the constructed text.
      slide = slide.slice(0, commentStartIndex) + injection + slide.slice(commentEndIndex);

      // Keep track of the number of characters added (the constructed text) and removed (the original comment).
      addedCharacters = addedCharacters + injection.length - (commentEndIndex - commentStartIndex);
    });

    // Close the last column.
    if (columnMarkers.length) {
      slide = slide + "]\n";
    }

    return slide;
  });

  // Rebuild the complete file by joining the individual slides together.
  return slides.join('---');
}
