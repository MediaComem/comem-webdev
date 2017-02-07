# npm

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is a package manager?](#what-is-a-package-manager)
- [What is npm?](#what-is-npm)
- [npm commands](#npm-commands)
- [npm install](#npm-install)
- [How do I reuse code?](#how-do-i-reuse-code)
- [How do I reuse code through npm?](#how-do-i-reuse-code-through-npm)
- [npm publish](#npm-publish)
- [How do I install myHelloModule and use it?](#how-do-i-install-myhellomodule-and-use-it)
- [How do I use npm if I'm lazy?](#how-do-i-use-npm-if-im-lazy)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is a package manager?

* Not reinventing the wheel...
* Building on the shoulders of giants.

## What is npm?

npm is the package manager for the Node JavaScript platform. It puts modules in place so that node can find them, and manages dependency conflicts intelligently.

It is extremely configurable to support a wide variety of use cases. Most commonly, it is used to publish, discover, install, and develop node programs.

https://docs.npmjs.com/getting-started/what-is-npm

npm is a set of command line tools that work together with the node registry

TODO: registry & package screenshot

## npm commands

TODO: npm help screenshot

## npm install

* You can install packages with npm install [options] <name>:
  * globally (this is the case for tools and CLI utilities used across projects):
    * You need to use the -g flag if you want to do that (and often sudo on Unix systems).
  * locally to a project (this is the case for libs that your code depends on):
    * In this case, you first use npm init which will create a package.json file. This file lists the packages you use and at what versions.
    * Then you can use npm install with the --save flag, which will install the latest version of the package you want and save its version to the package file.
    * The modules are stored in a (often large) directory named node_modules, which you typically add to your .gitignore file.

## How do I reuse code?

m1.js

```js
module.exports.a = "b";

module.exports.hello = function() {
  console.log("Hello!");
};
```

m2.js

```js
module.exports = function(name) {
  console.log("Hello " + name + "!");
};
```

myScript.js

```js
var module1 = require("./m1");

console.log(module1.a);
module1.hello();

var module2 = require("./m2");

module2("World");
```

Run it!

```js
$> node myScript.js
b
Hello!
Hello World!
```

## How do I reuse code through npm?

* Someone wrote myHello
* I want to use it in myScript
* How?

## npm publish

myHello/hello.js

```js
module.exports.hello = function() {
  console.log("Hello!");
};
```

myHello/package.json

```json
{
  "name": "myHello",
  "version": "1.0.0",
  "description": "My awesome module.",
  "main": "./hello.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/jdoe/hello"
  },
  "author": "John Doe <john.doe@example.com>",
  "license": "MIT"
}
```

Publish it!

```bash
$> cd myHelloModule
$> npm publish
```

## How do I install myHelloModule and use it?

Add the package as a dependency to your own package:

myScript/package.json

```json
{
  "name": "myApp",
  "version": "1.0.0",
  "description": "My awesome app.",
  "main": "script.js",
  "dependencies": {
    "myHello": "1.0.0"
  }
}
```

Install dependencies:

```bash
$> npm install
```

Require and use the dependencies:

myScript/script.js

```js
var myHello = require("myHello");

myHello.hello();
```

Enjoy:

```bash
$> node script.js
Hello!
```

## How do I use npm if I'm lazy?

Install the latest version of a new module and automatically save it to your package.json file:

```bash
$> npm install --save myHello
```

Note: Your package.json file must already exist.

## Resources

* Command line usage
  https://docs.npmjs.com/cli/npm
* package.json format
  https://docs.npmjs.com/files/package.json
