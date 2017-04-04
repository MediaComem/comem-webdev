# Angular Auth Starter

Kickstart your Citizen Engagement project by implementing a complete authentification workflow.

<!-- slide-include ../../BANNER.md -->

**You will need**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)
* [Sublime Text][sublime] (recommended, any code editor will do... **except Notepad**)

**Recommended reading**

* [Angular][ng]
* [Angular UI Router][ng-router]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [First step](#first-step)
- [What is contained in the base project](#what-is-contained-in-the-base-project)
- [The log in page](#the-log-in-page)
  - [Add the controller](#add-the-controller)
  - [Show it on the app](#show-it-on-the-app)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## First step

To start your project, you can clone the repository that contains a basic project structure.

To do this, go to the directory that contains all your project, and use this command:

```shell
$> git clone git@github.com:MediaComem/comem-webdev-angular-auth-starter.git
```

> You can also access directly the [GitHub page of the project][git-proj], and download a `.zip` file of the project.

> If you do this, be sure to download a zip for the `master` branch.

## What is contained in the base project

This project already contains some basic structure. That is:
* The `angular` framework
* The `angular-ui-router` library
* The `lodash`library *(not required, but could prove usefule for your project)*
* The `moment` library *(not required, but could prove usefule for your project)*
* The `Bootstrap CSS` framework
* An `index.html` file that includes all preceding frameworks/libraires
* An `app.js` file that contains:
  * The main `angular` module, named `app`
  * A `config` function attached to this `app` module with one predefined route, `home`
* An almost blank `main.html` template, used by the `home` state

## The log in page

First, let's create an `html` template that will display a form, which we will use to log our user.

In the `templates` directory, create a new file called `login.html` and put in the following code:

```html
<form id="login" name="loginForm">
  <div class="form-group">
    <label for="username">Username</label>
    <input required type="text" id="username" class="form-control">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input required type="password" class="form-control" id="password">
  </div>
  <button class="btn btn-success">Log in</button>
</form>
```
> We will complete this template throughout the slides.

### Add the controller

To control this page, i.e. the form, the button and the data, we will need a controller.

In the `js` directory, create a new file called `login-ctrl.js`, and add in the following code:

```js
angular
  .module('app')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl() {
  var login = this;
}
```

> Don't forget to add a `<script>` tag in your `index.html` file that points to this file, after the inclusion of the main `app.js` file.

### Show it on the app

To link all this together and show our login page on our app, we need to add a new navigation state to our router.

The states definition are located in the main `app.js` file. Open it and, right after the line 7, add a new `state` that points to the `login.html` template, with the `LoginCtrl` :

```js
// After line 7

```

> We do not user the HTML5 mode in this example. But if you'd like your url to not have the `#!` fragment, see [here][html5mode]

## Resources

**Documentation**


**Further reading**



[ng]: ../angular
[ng-router]: ../angular-ui-router
[chrome]: https://www.google.com/chrome/
[sublime]: https://www.sublimetext.com/
[ng-storage]: https://github.com/auth0/angular-storage/blob/master/dist/angular-storage.min.js
[git-proj]: https://github.com/MediaComem/comem-webdev-angular-auth-starter
[html5mode]: ../angular-ui-router/#13
