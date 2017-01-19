var _ = require('lodash'),
    util = require('util');

function MarkdownModel(markdown) {
  this.markdown = markdown;
  this.elements = [];
  parse(this);
}

MarkdownModel.prototype.add = function(newElement) {
  if (!_.isString(newElement.type)) {
    throw new Error('Element type must be a string, got ' + typeof(newElement.type));
  } else if (!_.isInteger(newElement.startIndex)) {
    throw new Error('Element start index must be an integer, got ' + JSON.stringify(newElement.startIndex) + ' (' + typeof(newElement.startIndex) + ')');
  } else if (newElement.startIndex < 0 || newElement.startIndex > this.markdown.length - 1) {
    throw new Error('Element start index must be between 0 and the length of the markdown text minus one (' + (this.markdown.length - 1) + '), got ' + newElement.startIndex);
  } else if (!_.isInteger(newElement.endIndex)) {
    throw new Error('Element end index must be an integer, got ' + JSON.stringify(newElement.endIndex) + ' (' + typeof(newElement.endIndex) + ')');
  } else if (newElement.endIndex < 1 || newElement.endIndex > this.markdown.length) {
    throw new Error('Element end index must be between 1 and the length of the markdown text (' + this.markdown.length + '), got ' + newElement.endIndex);
  } else if (newElement.endIndex <= newElement.startIndex) {
    throw new Error('Element end index must be greater than its start index (' + newElement.startIndex + '), got ' + newElement.endIndex);
  }

  var conflictingElement = _.find(this.elements, function(element) {
    return (newElement.startIndex >= element.startIndex && newElement.startIndex < element.endIndex)
      || (newElement.endIndex > element.startIndex && newElement.endIndex <= element.endIndex)
      || (newElement.startIndex < element.startIndex && newElement.endIndex > element.endIndex);
  });

  if (conflictingElement) {
    throw new Error('New element ' + JSON.stringify(newElement) + ' covers the same markdown as existing element ' + JSON.stringify(conflictingElement));
  }

  var nextElement = _.find(this.elements, function(element) {
    return element.startIndex > newElement.startIndex;
  });

  if (!nextElement) {
    this.elements.push(newElement);
  } else {
    this.elements.splice(this.elements.indexOf(nextElement), 0, newElement);
  }
};

MarkdownModel.prototype.replace = function(startIndex, endIndex, newMarkdown) {

  var contentBeforeElement = this.markdown.slice(0, startIndex),
      contentAfterElement = this.markdown.slice(endIndex);

  this.markdown = contentBeforeElement + newMarkdown + contentAfterElement;

  var addedCharacters = newMarkdown.length - (endIndex - startIndex);
  _.each(this.elements, function(element) {
    if ((element.startIndex > startIndex || element.startIndex == endIndex) && element.startIndex >= endIndex) {
      element.startIndex += addedCharacters;
      element.endIndex += addedCharacters;
    }
  });

  return this;
};

MarkdownModel.prototype.append = function(markdown) {
  this.markdown += markdown;
  return this;
};

MarkdownModel.prototype.find = function(predicate) {
  return _.find(this.elements, predicate);
};

MarkdownModel.prototype.findLast = function(predicate) {
  return _.findLast(this.elements, predicate);
};

MarkdownModel.prototype.transform = function() {

  var model = this;
  _.each(this.elements, function(element) {
    if (_.isFunction(element.transform)) {
      element.transform();
    }
  });

  return this.markdown;
};

function parse(model) {

  // Parse markdown titles
  parseElements(model, /^(\#+)\s*([^\#][^\n]+)/mg, MarkdownTitle);

  // Parse slide column comments
  parseElements(model, /\<\!\-\-\s*slide-column\s+(\d+)\s*\-\-\>/mg, MarkdownColumn);

  // Parse slide container comments
  parseElements(model, /\<\!\-\-\s*slide-container\s*\-\-\>/mg, MarkdownContainer);

  // Parse slide front matter comments
  parseElements(model, /\<\!\-\-\s*slide-front-matter\s+([^\n]+)\s*\-\-\>/mg, MarkdownFrontMatter);
}

function parseElements(model, regexp, constructor) {

  var parsedElements = [];

  var match;
  while (match = regexp.exec(model.markdown)) {

    var options = {
      match: match,
      markdown: match[0],
      startIndex: match.index,
      endIndex: match.index + match[0].length
    };

    model.add(new constructor(model, options));
  }
}



function MarkdownElement(model, options) {
  this.model = model;
  this.markdown = options.markdown;
  this.startIndex = options.startIndex;
  this.endIndex = options.endIndex;
}

MarkdownElement.prototype.replaceWith = function(newMarkdown) {
  if (!this.originalMarkdown) {
    this.originalMarkdown = this.markdown;
  }

  this.model.replace(this.startIndex, this.endIndex, newMarkdown);

  var addedCharacters = newMarkdown.length - this.markdown.length;
  this.markdown = newMarkdown;
  this.endIndex += addedCharacters;

  return this;
};

MarkdownElement.prototype.prepend = function(markdown) {
  return this.replaceWith(markdown + this.markdown);
};



function MarkdownColumn(model, options) {
  MarkdownElement.apply(this, arguments);
  this.type = 'column';
  this.columnSize = parseInt(options.match[1], 10);
}

util.inherits(MarkdownColumn, MarkdownElement);

MarkdownColumn.prototype.transform = function() {
  this.replaceWith('.grid-' + this.columnSize + '[');
  closeGridElement(this);
};



function MarkdownTitle(model, options) {
  MarkdownElement.apply(this, arguments);
  this.type = 'title';
  this.titleLevel = options.match[1].length;
  this.titleText = options.match[2];
}

util.inherits(MarkdownTitle, MarkdownElement);

MarkdownTitle.prototype.transform = function() {

  var startIndex = this.startIndex;
  var previousTitle = this.model.find(function(element) {
    return element.type == 'title' && element.startIndex < startIndex;
  });

  if (previousTitle) {
    this.model.replace(this.startIndex - 1, this.startIndex, '\n---\n');
  }
};



function MarkdownContainer(model, options) {
  MarkdownElement.apply(this, arguments);
  this.type = 'container';
}

util.inherits(MarkdownContainer, MarkdownElement);

MarkdownContainer.prototype.transform = function() {
  this.replaceWith('.container[');
  closeGridElement(this);
};



function MarkdownFrontMatter(model, options) {
  MarkdownElement.apply(this, arguments);
  this.type = 'frontMatter';
  this.frontMatter = options.match[1];
}

util.inherits(MarkdownFrontMatter, MarkdownElement);

MarkdownFrontMatter.prototype.transform = function() {
  this.replaceWith('');

  var slideTitle = getSlideStart(this.model, this.startIndex);
  if (slideTitle) {
    this.model.replace(slideTitle.startIndex - 1, slideTitle.startIndex, '\n\n' + this.frontMatter + '\n\n');
  }
};



function getSlideStart(model, index) {
  return model.findLast(function(element) {
    return element.type == 'title' && element.startIndex < index;
  });
}

function getNextGridElement(model, index) {
  return model.find(function(element) {
    return _.includes([ 'column', 'container', 'title' ], element.type) && element.startIndex > index;
  });
}

function closeGridElement(element) {
  var nextGridElement = getNextGridElement(element.model, element.startIndex);
  if (nextGridElement) {
    element.model.replace(nextGridElement.startIndex - 1, nextGridElement.startIndex, ']\n');
  } else {
    element.model.append('\n]');
  }
}



module.exports = MarkdownModel;
