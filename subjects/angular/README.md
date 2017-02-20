# Angular

Getting started with and understanding the basics of [AngularJS][angular] (version 1), the JavaScript front-end web application framework.

<!-- slide-include ../../BANNER.md -->

**Recommended reading**

* [JavaScript](../js/)
* [JavaScript closures](../js-closures/)
* [JavaScript prototypes](../js-prototypes/)

**Requirements**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is Angular?](#what-is-angular)
  - [Traditional Model-View-Controller (MVC) architecture](#traditional-model-view-controller-mvc-architecture)
  - [DOM manipulation and AJAX requests](#dom-manipulation-and-ajax-requests)
  - [Single-page applications](#single-page-applications)
  - [Dynamic HTML](#dynamic-html)
  - [Angular 2](#angular-2)
- [Getting started](#getting-started)
  - [Starter template](#starter-template)
  - [Overview](#overview)
  - [Modules](#modules)
  - [Controllers](#controllers)
  - [Services](#services)
  - [Filters](#filters)
- [TODO](#todo)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## What is Angular?

<!-- slide-front-matter class: center, middle, image-header -->

<p class='center'><img src='images/angular.png' width='20%' /></p>

> "Angular is a complete **JavaScript front-end web application framework** created by Google to address many of the challenges of developing **rich single-page applications**."



### Traditional Model-View-Controller (MVC) architecture

In traditional MVC frameworks,
the application's **Controllers** receive the user's requests when navigating from page to page in the browser,
and respond by generating HTML **Views** from the **Model**.

<img src='images/mvc.png' width='100%' />



### DOM manipulation and AJAX requests

TODO: jQuery for simple apps



### Single-page applications

<!-- slide-column -->

A single-page application (SPA) is a web application that **fits on a single web page** but provides a user experience similar to that of a **desktop application**.

* All content is retrieved with a **single page load or loaded dynamically**
* The page **does not reload** (location hash or HTML5 History API to navigate between logical pages)
* Dynamic **communication with the web server** behind the scenes

<!-- slide-column -->

<img src='images/spa.png' width='100%' />



### Dynamic HTML

> "AngularJS is what HTML would have been, had it been designed for building web-apps."

HTML is great for displaying static documents, but is not so good at describing the **dynamic views** needed for **rich, interactive applications**.

With Angular, you can:
  * **Automatically bind data** to HTML elements
  * **Extend the HTML vocabulary** with new elements and attributes
  * **Isolate** your application logic from how the data is displayed



### Angular 2

TODO: evolution of Angular (TypeScript)



## Getting started

<!-- slide-front-matter class: center, middle -->



### Starter template

This tutorial assumes that you have a web page running with Angular included.
If you don't, you can save the following HTML to a file and open it in your browser:

```html
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='utf-8'>
    <title>Angular demo</title>
    <script
src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js'>
    </script>
  </head>
  <body>
    <!-- Page content -->
  </body>
</html>
```



### Overview

<!-- slide-column -->

**Angular elements**

* Modules
* Controllers
* Scope
* Services
* Filters
* Directives & components
* Constants
* Config functions
* Run functions

<!-- slide-column -->

**Angular concepts**

* Interpolation
* Two-way data binding
* Dependency injection
* Form validation



### Modules

To make an Angular application, you have to create a **module**:

```js
// Create an angular module
angular.module('starter', []);
```

The two arguments of `angular.module()` are:

* A name (in this case: the name of your application)
* A list of dependencies (leave it blank for now)

To plug your Angular application into a web page, use the `ng-app` attribute.
It's customary to put it on the `<body>` tag:

```html
*<body ng-app='starter'>
  <!-- Page content -->
</body>
```



### Controllers

A controller is a function which **controls part of an HTML template**:

```js
angular.module('starter').controller(`'HelloController'`, function($scope) {
  $scope.name = 'World';
});
```

You can apply your controller to the HTML tags you want to control with the `ng-controller` attribute:

```html
<div `ng-controller='HelloController'`>
  <p>Hello {{ name }}!</p>
</div>
```

Let's dig into that line by line.

#### Creating a controller

Note that we call `angular.module()` again, but this time **only with the name**.
Instead of creating a new module, this returns the **existing module** with that name:

```js
`angular.module('starter')`.controller('HelloController', function($scope) {
  $scope.name = 'World';
});
```

Then, we define a controller named `HelloController`:

```js
angular.module('starter')`.controller('HelloController'`, function($scope) {
  $scope.name = 'World';
});
```

That controller is simply a **function**:

```js
angular.module('starter').controller('HelloController', `function($scope) {`
* $scope.name = 'World';
`}`);
```

#### The scope

The `$scope` object is the **view model**, i.e. the model that will be presented by the view:

```js
angular.module('starter').controller('HelloController', function(`$scope`) {
  `$scope.name` = 'World';
});
```

Properties you attach to the scope can be interpolated into HTML templates with double curly braces:

```html
<div ng-controller='HelloController'>
  <p>Hello `{{ name }}`!</p>
</div>
```

#### Named controllers

You can also access the scope by using **named controllers**.
Instead of using the `$scope`, you attach properties directly to the controller using `this`:

```js
angular.module('starter').controller('HelloController', function() {
  `this.name` = 'World';
});
```

In the template, use `MyController as myName` in the `ng-controller` attribute.
This assigns a name to the controller, which you can then use in interpolation:

```html
<div ng-controller='HelloController `as ctrl`'>
  <p>Hello {{ `ctrl.name` }}!</p>
</div>
```

Even when using this syntax, there is still a **scope** being created and used.

You will find examples of both (using only the scope or using named controllers) in the documentation and examples online.

#### Using functions in the view

You can also attach functions to the scope or controller:

```js
angular.module('starter').controller('HelloController', function() {
  this.name = 'World';
* this.double = function(n) {
*   return n * 2;
* };
});
```

These functions can be called in the view:

```html
<div ng-controller='HelloController as ctrl'>
  <p>Hello {{ ctrl.name }}!</p>
* <p>Two times two equals {{ double(2) }}</p>
</div>
```

#### Data binding

Using `ng-model`, you can bind data from the view to the scope:

```html
<p>Two times <input `ng-model='ctrl.value'` /> equals {{ double(`ctrl.value`) }}</p>
```

What's interesting is that it goes both ways with Angular:

```js
angular.module('starter').controller('HelloController', function() {
  var ctrl = this;
  // ...
* this.reset = function() {
*   ctrl.value = 2;
* };
});
```

Add a button below the previous HTML:

```html
<p>Two times <input ng-model='ctrl.value' /> equals {{ double(ctrl.value) }}</p>
*<button type='button' ng-click='ctrl.reset()'>Reset</button>
```

See how the view changes when you modify the value and click the reset button.

#### Two-way data binding

<!-- slide-column -->

Traditional templating systems bind data **in only one direction**.

The developer has to write code that constantly syncs the view with the model and vice versa.

<img src='images/one-way-data-binding.png' width='100%' />

<!-- slide-column -->

With Angular changes are **immediately reflected** in both view and model.

This is one of the great strengths of Angular: the **controller** is completely **isolated from and unaware of the view**.
It does not care about DOM manipulation or rendering concerns.

<img src='images/two-way-data-binding.png' width='100%' />



### Services

In general, controllers shouldn't try to do too much.
They should contain only the business logic needed for a **single view**.
Keep controllers slim is by encapsulating work that doesn't belong to controllers into **services** and then using these services in controllers.

You can create a service by calling `factory()`.
As the name implies, you must pass a **factory function** that will create and return the service.

Let's create a service with that `double` function we wrote earlier:

```js
angular.module('starter')`.factory('HelloService', function() {`

  var service = {};

  service.double = function(n) {
    return n * 2;
  };

  return service;
`}`);
```

#### Dependency injection

Using the service is as simple as adding it as an argument to our controller:

```js
angular.module('starter').controller('HelloController', function(`HelloService`) {
  this.name = 'World';
  this.double = `HelloService.double`;
});
```

This works because Angular is built around **dependency injection**:

* When you define a controller, service or other kind of Angular element, you give it **a name**
* In the factory function that creates the controller (or other element), you tell Angular **the names of the other elements you need** as arguments
* Angular will **inject** the required elements into your factory function for you

#### Why dependency injection?

<!-- slide-column -->

**Strong coupling**

```js
function Car() {
  this.engine = new Engine(24);
}
function Engine(gasLead) {
  this.gas = new Gas(gasLead);
}
function Gas(lead) {
  this.lead = lead;
}
```

<img src='images/di-new.png' width='100%' />

<!-- slide-column -->

**Loose coupling** (with an *injector*)

```js
function Car(engine) {
  this.engine = engine;
}
function Engine(gas) {
  this.gas = gas;
}
function Gas(lead) {
  this.lead = lead;
}
```

<img src='images/di-injection.png' width='100%' />

#### The $http service

Angular provides several useful services out of the box.
The `$http` service can make AJAX requests for you:

```js
angular.module('starter').factory(HelloService, function(`$http`) {

  var service = {};

  service.retrieveJoke = function() {
    return `$http.get('https://api.icndb.com/jokes/random')`.then(function(res) {
      return res.data.value.joke;
    });
  };

  // ...

  return service;
});
```

#### Making HTTP requests through a service

It's good practice to make HTTP requests in a service rather than in a controller directly.
That way your controller remains **as simple as possible** and only manages the view:

```js
angular.module('starter').controller('HelloController', function(HelloService) {

  var ctrl = this;
  this.name = 'World';
  this.double = HelloService.double;

  HelloService.retrieveJoke().then(function(joke) {
    ctrl.joke = joke;
  });
});
```

You can now display the joke in the HTML template:

```html
<div ng-controller='HelloController as ctrl'>
  <p>Hello {{ ctrl.name }}!</p>
  <p>Two times two equals {{ double(2) }}</p>
* <p>Did you hear? {{ joke }}</p>
</div>
```



### Filters

Filters are simple functions that format a value for display to the user.

To create a filter, you must use `filter()` and pass a factory function (where you can inject dependencies if you need them).
This function **must return the filter function** that will be called with the value:

```js
angular.module('starter').filter('hello', function() {
* return function(input) {
*   return 'Hello ' + input + '!';
* };
});
```

You apply a filter by "piping" a value into it.
Let's modify the first paragraph of our previous template a bit:

```html
<p>{{ `ctrl.name | hello` }}</p>
```

#### Built-in filters

Angular has a number of useful [built-in filters][angular-built-in-filters]:

Filter    | Purpose
:---      | :---
filter    | Filter an array
currency  | Format a number as currency
number    | Format a number as text (e.g. with thousands separator)
date      | Format date a string with a custom format
json      | Converts a JavaScript object into a JSON string
lowercase | Converts a string to lower case
uppercase | Converts a string to upper case
limitTo   | Select a subset from an array
orderBy   | Order an array's elements

#### A few filter examples

Several filters can be "piped" together:

```html
<p>{{ ctrl.name | uppercase | hello }}</p>
```

Let's try the `date` filter:

```html
<p>It's {{ new Date() | date: 'HH:mm:ss' }}</p>
```



## TODO

* Directives & components
* Constants
* Config functions
* Run functions
* Scope hierarchy
* Form validation
* Angular gotchas (dom manipulation in controllers, injection syntaxes for minification)



## Resources

* [Angular][angular]



[angular]: https://angularjs.org/
[angular-codepen]: http://codepen.io/AlphaHydrae/pen/LxoRze?editors=1010#0
[angular-built-in-filters]: https://docs.angularjs.org/api/ng/filter
[chrome]: https://www.google.com/chrome/
[html-history-api]: https://developer.mozilla.org/en-US/docs/Web/API/History_API
