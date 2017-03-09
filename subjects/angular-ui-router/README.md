# Angular UI Router

Advanced routing for Angular applications.

<!-- slide-include ../../BANNER.md -->

**Recommended reading**

* [Angular](../angular/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is UI Router?](#what-is-ui-router)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## What is UI Router?

<!-- slide-front-matter class: center, middle, image-header -->

<p class='center'><img src='images/angular-ui-router.jpg' /></p>

Angular has a built-in router, [ngRoute][angular-router], but it's not very flexible.
[Angular UI router][angular-ui-router] is a community-developed alternative which is much more popular (and powerful).



### States

UI router is basically a [state machine][state-machine].
Think about each **page** of an application as a **set of states**:

<!-- slide-column -->

* Only **one state can be active at one time**
* The user can **transition from one state to another**, to activate a different page or feature of the application

<!-- slide-column 60 -->

<p class='center'><img src='images/state-machine.png' class='w100' /></p>

#### Defining states

You define states in an **Angular config function** by injecting the `$stateProvider` and calling its `state` function with **state definition objects**:

```js
angular.module('starter').config(function($stateProvider) {
  `$stateProvider.state`('homePage', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomePageController',
    controllerAs: 'homePageCtrl'
  });

  `$stateProvider.state`('itemsPage', {
    url: '/items',
    templateUrl: 'templates/items.html',
    controller: 'ItemsPageController',
    controllerAs: 'itemsPageCtrl'
  });
});
```

#### State definition objects

Each state usually has at least:

* A `name`: this is the unique name of the state in the state machine
* An `url`: this is the URL that will trigger the state machine to **move to this state** when the user visits it
* A `template` or `templateUrl`: the **view** to display when the app is in that state
* A `controller`: the **logic** for that state's view

```js
$stateProvider.state(`'homePage'`, {
  `url`: '/',
  `templateUrl`: 'templates/home.html',
  `controller`: 'HomePageController',
  `controllerAs`: 'homePageCtrl'
});
```

#### Using components

You can also encapsulate your page into an **Angular component** and give that to UI router instead of the separate template and controller:

```js
angular.module('starter')`.component('HomePageComponent'`, {
  templateUrl: 'templates/home.html',
  controller: function() {
    // ...
  }
});

angular.module('starter').config(function($stateProvider) {
  $stateProvider.state(`'homePage'`, {
    `url`: '/',
    `component`: 'HomePageComponent'
  });
});
```



## TODO

* ui-view (and ion-nav-view)
* ui-sref
* $state.go
* Default state
* URL parameters
* Resolve?
* Nested states
* Named views
* Transitions



[angular-router]: https://docs.angularjs.org/api/ngRoute
[angular-ui-router]: https://ui-router.github.io
[state-machine]: https://en.wikipedia.org/wiki/Finite-state_machine
