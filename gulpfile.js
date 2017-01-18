var _ = require('lodash'),
    fs = require('fs'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    handlebars = require('handlebars'),
    lodash = require('lodash'),
    rename = require('gulp-rename'),
    through = require('through2'),
    watch = require('gulp-watch');

var remarkTemplate = handlebars.compile(fs.readFileSync('templates/remark.html', { encoding: 'utf-8' }));

gulp.task('watch', function() {
  return watch('javascript-intro/**/*.md')
    .pipe(through.obj(gulpMarkdownToRemarkSlides))
    .pipe(rename(renameMarkdownToIndex))
    .pipe(gulp.dest('docs'));
});

gulp.task('serve', function() {
  return connect.server({
    root: 'docs',
    port: process.env.PORT || 3000
  });
});

gulp.task('default', [ 'serve' ]);

function renameMarkdownToIndex(path) {
  path.basename = 'index';
  path.extname = '.html';
}

function gulpMarkdownToRemarkSlides(file, enc, callback) {

  var remarkSlides = markdownToRemarkSlides(file.contents.toString());
  file.contents = new Buffer(remarkSlides);

  this.push(file);
  callback();
}

function markdownToRemarkSlides(markdown) {

  markdown = enrichWithSlideSeparators(markdown);
  markdown = enrichWithUnsemanticColumns(markdown);

  return remarkTemplate({
    source: markdown
  });
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
