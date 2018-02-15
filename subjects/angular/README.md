# Angular

Get started with and understand the basics of [Angular][angular], the JavaScript front-end web application framework.

This is a 

<!-- slide-include ../../BANNER.md -->

**You will need**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)

**Recommended reading**

* [JavaScript][js]
* [JavaScript closures][js-closures]
* [TypeScript][ts-subject]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is Angular?](#what-is-angular)
  - [Traditional Model-View-Controller (MVC) architecture](#traditional-model-view-controller-mvc-architecture)
  - [DOM manipulation and AJAX requests](#dom-manipulation-and-ajax-requests)
  - [Single-page applications](#single-page-applications)
  - [Dynamic HTML with Angular](#dynamic-html-with-angular)
  - [Evolution of Angular](#evolution-of-angular)
- [Getting started](#getting-started)
  - [Starter template](#starter-template)
  - [Overview](#overview)
  - [Modules](#modules)
  - [Components](#components)
  - [User input](#user-input)
  - [Directives](#directives)
  - [Models](#models)
- [Services](#services)
  - [The joke service](#the-joke-service)
  - [Providing the joke service](#providing-the-joke-service)
  - [Injecting the joke service](#injecting-the-joke-service)
  - [Why does it work?](#why-does-it-work)
  - [Dependency injection](#dependency-injection)
- [Observable data](#observable-data)
  - [What is reactive programming?](#what-is-reactive-programming)
  - [Making `getJoke()` observable](#making-getjoke-observable)
  - [Subscribing to an Observable](#subscribing-to-an-observable)
- [Making HTTP calls](#making-http-calls)
  - [Injecting `HttpClient`](#injecting-httpclient)
  - [Joke API response](#joke-api-response)
  - [Making a GET call](#making-a-get-call)
  - [Transforming data](#transforming-data)
  - [Transforming Observable streams](#transforming-observable-streams)
  - [Filters](#filters)
  - [Components](#components-1)
- [Forms](#forms)
  - [HTML validations](#html-validations)
  - [Binding to form state](#binding-to-form-state)
- [The `$http` service](#the-http-service)
  - [How to make requests](#how-to-make-requests)
  - [How to parse a response](#how-to-parse-a-response)
- [Best practices](#best-practices)
  - [File structure](#file-structure)
  - [Multiple controllers on one page](#multiple-controllers-on-one-page)
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

<!-- slide-column -->

Serving dynamic HTML from the server works, but each user action requires that a **complete page be loaded** from the server.

To improve user experience:

* [AJAX][ajax] was developed in 1999 to retrieve data from the server asynchronously in the background
* [jQuery][jquery] was released in 2006 to simplify DOM manipulation and AJAX requests

<!-- slide-column 40 -->

<img src='images/jquery-ajax.gif' class='w100' />

<!-- slide-container -->

This allows you to load data from the server in the background and **dynamically update the page** without reloading.

Initially, these technologies were used to **enrich** existing HTML pages that were still built and served by a traditional MVC framework.



### Single-page applications

<!-- slide-column -->

A single-page application (SPA) is a web application that **fits on a single web page** but provides a user experience similar to that of a **desktop application**:

* All content is retrieved with a **single page load or loaded dynamically**
* The page **does not reload** (location hash or [HTML 5 History API][html-history-api] to navigate between logical pages)
* Dynamic **communication with the web server** behind the scenes

<!-- slide-column -->

<img src='images/spa.png' width='100%' />



### Dynamic HTML with Angular

> "AngularJS is what HTML would have been, had it been designed for building web-apps."

HTML is great for displaying static documents, but is not so good at describing the **dynamic views** needed for **rich, interactive applications**.

With Angular, you can:
  * **Automatically bind data** to HTML elements
  * **Extend the HTML vocabulary** with new elements and attributes
  * **Isolate** your application logic from how the data is displayed



### Evolution of Angular

Angular is one of the most popular client-side frameworks, and it is still evolving.
Starting with version 2 of the framework (released in June 2016) you can take advantage of:

* [TypeScript][ts]: a superset of JavaScript with optional typing and the latest ECMAScript features
* [Web components][web-components]: a way to create reusable user interface widgets



## Getting started

<!-- slide-front-matter class: center, middle -->



### Starter template

You can clone the following project for the exercises in this tutorial:

[COMEM+ Angular Starter Project][angular-starter]

You should keep your [developer console][chrome-dev] open throughout this tutorial to detect errors in your code.



### Overview

<!-- slide-column -->

**Angular elements**

* Modules
* Components
* Directives
* Services
* HTTP
* Pipes

<!-- slide-column -->

**Angular concepts**

* Interpolation
* Data binding
* Dependency injection
* Form validation



### Modules

An Angular application is a **module**.
You can find one in `src/app/app.module.ts` in the starter project:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

`@NgModule`({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class `AppModule` { }
```

A module is a way to help organize related things (components, services, etc) together.

#### Basic module definition

Take a look at the [`@NgModule`][angular-docs-ng-module] annotation:

```ts
@NgModule({
  `declarations`: [
    AppComponent
  ],
  `imports`: [
    BrowserModule
  ],
  `providers`: [],
  `bootstrap`: [AppComponent]
})
```

* The **declarations** array is a list of components (also directives and pipes) which belong to this module.
* The **imports** array is a list of other modules whose exported components should be available in this module.
  It allows you to express a dependency on another module.
* The **providers** array is a list of service providers (more about that later).
* **bootstrap** is the root component that Angular creates and inserts into `index.html`



### Components

Components are the most basic **building block** of an UI in an Angular application.
An Angular application is a tree of Angular components.

You will find a component in `src/app/app.component.ts` in the starter project:

```ts
import { Component } from '@angular/core';

`@Component`({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export `class AppComponent` {
  title: string;

  constructor() {
    this.title = 'app';
  }
}
```

A component is any [JavaScript class][js-classes] annotated with the [`@Component`][angular-docs-component] decorator.

Let's dig into that line by line.

#### Component selector

The `selector` property of the `@Component` decorator indicates what tag you should put in your HTML to instantiate the component:

```ts
@Component({
  `selector: 'app-root'`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```

Open `src/index.html` in the starter project.
You will find the `<app-root>` tag:

```html
<body>
  `<app-root></app-root>`
&lt;/body&gt;
```

#### Component template

The `templateUrl` property of the `@Component` decorator tells Angular which HTML file to use to display the component:

```ts
@Component({
  selector: 'app-root',
  `templateUrl: './app.component.html'`,
  styleUrls: ['./app.component.css']
})
```

For very simple components, you can also use `template` instead of `templateUrl` to use an **inline template**:

```ts
@Component({
  selector: 'app-root',
  `template: '<h1>Welcome to {{ title }}!</h1>'`,
  styleUrls: ['./app.component.css']
})
```

#### Component styles

Similarly, the `styleUrls` property is a list of CSS files to apply to the component:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  `styleUrls: ['./app.component.css']`
})
```

It's also possible to use **inline styles** for very simple components:

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  `styles: [ 'h1 { font-weight: normal;  }' ]`
})
```

Styles in Angular are **modular**.
They apply only *within the template of that component*.

Read the [Component Styles][angular-component-styles] documentation to learn more.

#### Data binding

You can display data by **binding** parts of an HTML template to properties of a component.

```ts
export class AppComponent {
  `title: string;`

  constructor() {
    this.title = 'app';
  }
}
```

Enclosing a component's property name in double curly braces in the template is called **interpolation**:

```html
<h1>
  Welcome to `{{ title }}`!
</h1>
```

#### Interpolation with functions

Interpolation is not limited to simple properties.
You can also use a component's **methods** in the template.

Add the following method to the component (`src/app/app.component.ts`):

```ts
export class AppComponent {
  // ...

* hello(name: string): string {
*   return 'Hello ' + name + '!';
* }
}
```

Now use that function in the template (`src/app/app.component.html`):

```html
<p>
  `{{ hello("World") }}`
</p>
```



### User input

One of the things you will need to do is **react to user input** (e.g. through forms).
Let's make our greeting **dynamic** by adding an input field to customize the name.
Make the following changes to the component:

```ts
export class AppComponent {
  title: string;
  `greeting: string;`

  constructor() {
    this.title = 'app';
    `this.greeting = '';`
  }
  // ...
}
```

Now interpolate that new property into the function in the template:

```html
<p>
  {{ `hello(greeting)` }}
</p>
```

#### `ngModel`

Add an input field to the template above the greeting:

```html
*<p>
* <input type='text' placeholder='Who are you?' [(ngModel)]='greeting' />
*</p>
<p>
  {{ `hello(greeting)` }}
</p>
```

`[(ngModel)]` is Angular's **two-way data binding** syntax.
It binds the `greeting` property to the HTML input field.

You will most likely get this error:

```
Uncaught Error: Template parse errors:
Can't bind to 'ngModel' since it isn't a known property of 'input'.
```

This is because `[(ngModel)]` belongs to the optional `FormsModule`, which you have to *opt in* to using.

#### `FormsModule`

To **import** the module into your application, you must add it to the `imports` array of your own module in `src/app/app.module.ts`:

```ts
*import { FormsModule } from '@angular/forms';
// Other imports...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    `FormsModule`
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once you've done that, the field should display correctly.

#### Two-way data binding

<!-- slide-column -->

Traditional templating systems bind data **in only one direction**.

The developer has to write code that constantly syncs the view with the model and vice versa.

<img src='images/one-way-data-binding.png' width='100%' />

<!-- slide-column -->

With Angular changes are **immediately reflected** in both view and model.

Also note that our **component** is **isolated from and unaware of the view**:
it does not care about DOM manipulation or rendering concerns.

<img src='images/two-way-data-binding.png' width='100%' />



### Directives

A **directive** is a class with a `@Directive` decorator.

The **component** that we've seen before is a *directive-with-a-template*
A `@Component` decorator is actually a `@Directive` decorator extended with template-oriented features.

Two other kinds of directives exist: **structural** and **attribute** directives.

#### Structural directives

Structural directives are responsible for HTML layout.
They shape or reshape the **DOM's structure**, typically by **adding, removing, or manipulating elements**.

Let's add the [`ngIf`][angular-docs-ng-if] directive to our template as an example:

```html
<p `*ngIf='greeting'`>
  {{ hello(greeting) }}
</p>
```

As you can see, the entire paragraph is now removed from the DOM as long as the `greeting` property is blank (e.g. `undefined` or an empty string).
It is added back as soon as `greeting` has a value.

Read the [documentation][angular-structural-directives] to learn more about structural directives.
Many more such directives are provided by Angular out of the box, like [`ngFor`][angular-docs-ng-for] (which we'll use later) and [`ngSwitch`][angular-docs-ng-switch].

#### Attribute directives

An **attribute** directive changes the **appearance or behavior of a DOM element**.

Create a `src/app/highlight.directive.ts` file with the following contents:

```ts
import { Directive } from '@angular/core';

`@Directive`({
  selector: '[appHighlight]'
})
export `class HighlightDirective` {
  constructor() {
    console.log('the highlight directive was used');
  }
}
```

Similarly to a component, a directive is a JavaScript class, this time annotated with the [`@Directive`][angular-docs-directive] decorator.

The selector, `[appHighlight]` is an [attribute selector][css-attribute-selector].
Also note that it is good practice to prefix the selector with your application name ("app" for this example) to avoid **naming collisions** with other directives.

##### Using an attribute directive

To use your new attribute directive, you must **declare** it in your module's `declarations` array in `src/app/app.module.ts`:

```ts
*import { HighlightDirective } from './highlight.directive';
// Other imports...

@NgModule({
  declarations: [
    AppComponent,
    `HighlightDirective`
  ],
  // ...
})
export class AppModule { }
```

Now all you need to do is add the attribute to an element in `src/app/app.component.html`.
Let's add it to the greeting.

```html
<h1 `appHighlight`>
  Welcome to {{ title }}!
</h1>
```

You should see the directive being used in the console after entering some text in the input field.

##### Modifying the DOM

Now add an `ElementRef` argument to the directive's constructor:

```ts
import { Directive, `ElementRef` } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(`el: ElementRef`) {
    `el.nativeElement.style.backgroundColor = 'yellow';`
  }
}
```

Doing this **injects** a reference to the host DOM element, the element to which you applied the `appHighlight` attribute.

`ElementRef` grants direct access to the host DOM element through its `nativeElement` property.
In this example we set the background color to yellow.

#### Common directives

These common directives are provided by Angular out of the box:

* [`ngClass`][angular-docs-ng-class] - Adds and removes **CSS classes** on an HTML element.
* [`ngFor`][angular-docs-ng-for] - Instantiates a template **once per item** from an iterable.
* [`ngIf`][angular-docs-ng-if] - **Conditionally includes** a template based on the value of an expression.
* [`ngPlural`][angular-docs-ng-plural] - Adds/removes DOM sub-trees based on a numeric value. (Tailored for **pluralization**.)
* [`ngStyle`][angular-docs-ng-style] - Update an HTML element's **styles**.
* [`ngSwitch`][angular-docs-ng-switch] - Adds/removes DOM sub-trees when the nest match expressions matches the **switch** expression.



### Models

Let's make our application funny by adding some jokes.

It's good practice to create **classes** for your **business models**.
Let's start with a very simple one.

Angular CLI comes with scaffolding tools to help you create files.
You can generate a model class with the following command:

```bash
$> ng generate class models/joke
```

This will create a `src/app/models/joke.ts` file.
Open it and add a `text` attribute to our new `Joke` class:

```ts
export class Joke {
  `text: string;`
}
```

#### Using models

Let's add some jokes to our component:

```ts
// Other imports...
`import { Joke } from './models/joke';`

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  greeting: string;
  `jokes: Joke[];`

  constructor() {
    this.title = 'app';
    this.greeting = '';
*   this.jokes = [
*     { text: 'Knock knock' },
*     { text: 'The cake is a lie' }
*   ];
  }
  // ...
}
```

#### Using `ngFor`

Now that we have some jokes, let's display them.
We want a `<ul>` list, with a `<li>` item for each joke.
That's a job for the [`ngFor`][angular-docs-ng-for] directive.

Add this at the bottom of the component's template:

```html
<ul>
  <li *ngFor='let joke of jokes'>{{ joke.text }}</li>
</ul>
```

The directive handles repeating the `<li>` element for us.
No need to write it multiple times, or to manually build and concatenate DOM elements in the component's TypeScript code.

#### Using `ngPlural`

While we're at it, let's also add a header above the list:

```html
<h2>
  {{ jokes.length }} jokes
</h2>
```

You might notice that we'll have a minor problem when there is only one joke.
It will say "1 jokes" instead of "1 joke".

The [`ngPlural`][angular-docs-ng-plural] directive comes to the rescue:

```html
<h2 [ngPlural]='jokes.length'>
  {{ jokes.length }}
  <ng-template ngPluralCase='=1'>joke</ng-template>
  <ng-template ngPluralCase='other'>jokes</ng-template>
</h2>
```



## Services

Let's do something more interesting: fetch some jokes from the internet.

To do it "The Angular Way", we'll encapsulate that functionality into a **service**.

Why?
**Components** should not try to do too much;
they should focus on **presenting data** and **delegate data access** to specialized classes.
**Services** are here to fill that role.

This helps your components remain as simple as possible while services handle your business logic.

Let's use Angular CLI to generate a joke service:

```bash
$> ng generate service --spec false services/joke
```

(The `--spec false` option disables the generation of an test file for the service.
We will not cover [automated tests][angular-testing] in this tutorial, but you should definitely check it out.)

### The joke service

The `src/app/services/joke.service.ts` file has been generated:

```ts
import { Injectable } from '@angular/core';

`@Injectable`()
export `class JokeService` {
  constructor() { }
}
```

Once again, a service is simply a JavaScript class, annotated with the [`@Injectable`][angular-docs-injectable] decorator.
More about that later.

For now, simply add a method which returns a joke:

```ts
`import { Joke } from '../models/joke';`

@Injectable()
export class JokeService {
  constructor() { }

* getJoke(): Joke {
*   return { text: 'Knock knock' };
* }
}
```

### Providing the joke service

To use the service, you must **provide** it in your module's `providers` array in `src/app/app.module.ts`:

```ts
// Other imports...
`import { JokeService } from './services/joke.service';`

@NgModule({
  // ...
  providers: [
    `JokeService`
  ],
  // ...
})
export class AppModule { }
```

### Injecting the joke service

Once you've done that, you can **inject** it into your component.
You just have to add a **constructor parameter property**.
While you're at it, also add a **method to add a joke**:

```ts
export class AppComponent {
  // ...
  constructor(`private jokeService: JokeService`) {
    // ...
  }

* addJoke() {
*   this.jokes.push(this.jokeService.getJoke());
* }
  // ...
}
```

And add a button to use that method in the template:

```html
<p>
  <button type='button' (click)='addJoke()'>Add joke</button>
</p>
```

The `(click)` attribute is Angular's syntax to listen to the `click` event on a DOM element and trigger something when it occurs.

### Why does it work?

Our component now uses the service.
But why does it work?
All you did was add a parameter property to the constructor:

```ts
constructor(`private jokeService: JokeService`) {
  // ...
}
```

As a reminder, in TypeScript this is equivalent to:

```ts
export class AppComponent {
  `jokeService: JokeService;`

  constructor(`jokeService: JokeService`) {
    `this.jokeService = jokeService;`
  }
}
```

You **never instantiated the service with `new`**, so where is the instance coming from?

### Dependency injection

Angular relies on [dependency injection][di] to plug components, services and other elements together.

* After creating your service, you **provided** it in the application **module**.
* This makes it possible for Angular's **injector** to know that your service exists and to create instances of it.
* By adding the parameter to the component's constructor, you **asked Angular to inject** an instance of the service at runtime.

Dependency injection is a form of [inversion of control][ioc],
meaning that parts of your code **receive** the flow of control instead of driving it like in classic procedural programming.

The general goal is to:

* **Decouple** the execution of a task from implementation.
* **Focus** a component on the task it is designed for.
* **Free components from assumptions** about how other systems do what they do and instead rely on **contracts**.
* **Prevent side effects** when **replacing** a component.

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



## Observable data

Our current `getJoke()` method has a **synchronous** signature; implying that data is returned right away:

```ts
const joke = jokeService.getJoke();
```

This will **not** work when fetching jokes from a **remote server**, which is inherently an **asynchronous** operation.

The `getJoke()` method must be modified to not immediately return a joke, but to have an asynchronous signature.
It could take a **callback** or return a [**Promise**][js-promise].

Another solution is to return an **Observable**.
Angular includes the [RxJS][rxjs] library for reactive programming using Observables,
to make it easier to compose asynchronous or callback-based code.

### What is reactive programming?

Basically, **reactive programming** is programming with **asynchronous** data **streams**.

<p class='center'><img src='images/reactive-programming.png' class='w50' /></p>

RxJS is a library which provides an amazing toolbox of functions to **combine, create and filter** any of those streams.

In Angular 2+, many asynchronous operations are represented as Observable streams.
For example, making an **HTTP call** will return an **Observable** which emits either a **response** or an **error**.
You may **subscribe** to that observable to be notified of the result of the asynchronous call.

To learn more about reactive programming,
you may want to read ["The introduction to Reactive Programming you've been missing"][intro-to-reactive-programming].

### Making `getJoke()` observable

Since Angular's `HttpClient` returns **Observables**, that's what we'll use.

For now, let's modify the `getJoke()` method's signature to return an Observable,
without actually making an HTTP call yet:

```ts
// Other imports...
*import { Observable } from 'rxjs/Rx';

@Injectable()
export class JokeService {
  // ...
  getJoke(): `Observable<Joke>` {
    return `Observable.of({ text: 'Knock knock' })`;
  }
}
```

`Observable.of` allows us to create a stream which will simply emit the specified value (or values) and complete.

### Subscribing to an Observable

Of course, the code in our component no longer works now,
since it expects a `Joke` and gets an Observable of a `Joke` instead:

```
ERROR in src/app/app.component.ts(26,21): error TS2345:
  Argument of type 'Observable<Joke>' is not assignable to parameter of type 'Joke'.
  Property 'text' is missing in type 'Observable<Joke>'.
```

Use the `subscribe` method of the Observable to be notified when a Joke is emitted on the stream:

```ts
addJoke() {
* this.jokeService.getJoke().subscribe(joke => {
*   this.jokes.push(joke);
* });
}
```

We now have our **asynchronous** implementation:

* The call to `subscribe` is made immediately when `addJoke` is called.
* But the **callback** adding the new joke into the array will be called **later**,
  after the data has been fetched from the remote server.



## Making HTTP calls

Time to actually fetch some jokes from the internet.
We'll need Angular's [`HttpClient`][angular-docs-http-client].
It is part of `HttpClientModule`,
so we need to provide that to our own application module:

```ts
// Other imports...
*import { HttpClientModule } from '@angular/common/http';

@NgModule({
  // ...
  imports: [
    BrowserModule,
    FormsModule,
    `HttpClientModule`
  ],
  // ...
})
export class AppModule { }
```

### Injecting `HttpClient`

Earlier we annotated `JokeService` with the [`@Injectable`][angular-docs-injectable] decorator.
This not only makes it available to the **injector** for creation,
but also allows it to **inject dependencies of its own**.

Now that `HttpClientModule` is available, you can inject `HttpClient` into `JokeService`:

```ts
// Other imports...
*import { HttpClient } from '@angular/common/http';

@Injectable()
export class JokeService {
  constructor(`private httpClient: HttpClient`) { }
  // ...
}
```

### Joke API response

The API we are going to call returns JSON data that looks like this:

```json
{
  "type": "success",
  "value": {
    "categories": [],
    "id": 1,
    "joke": "Knock knock"
  }
}
```

This does not fit our `Joke` model, which only has a `text` property.

#### Joke API response model

Let's create a new `JokeResponse` model that we can use with this API:

```bash
$> ng generate class models/joke-response
```

Update the generated model to reflect the **structure** of the API response.
Since it's a nested structure, we'll need 2 classes:

```ts
export class JokeResponse {
  type: string;
  value: JokeResponseValue;
}

export class JokeResponseValue {
  categories: string[];
  id: number;
  joke: string;
}
```

### Making a GET call

We can now update `addJoke()` to make an actual HTTP call:

```ts
// Other imports...
*import { JokeResponse } from '../models/joke-response';

@Injectable()
export class JokeService {
  // ...
  getJoke(): Observable<Joke> {
*   return this.httpClient
*     .get<JokeResponse>('https://api.icndb.com/jokes/random');
  }
}
```

As you can see, [`HttpClient`][angular-docs-http-client]'s `get` method is **generic**,
and Angular will take care of parsing the response body and giving us an object of the right type.

But we're still left with one problem: we need an Observable of `Joke` objects, and have one of `JokeResponse` objects instead:

```
ERROR in src/app/services/joke.service.ts(15,5): error TS2322:
  Type 'Observable<JokeResponse>' is not assignable to type 'Observable<Joke>'.
  Type 'JokeResponse' is not assignable to type 'Joke'.
  Property 'text' is missing in type 'JokeResponse'.
```

### Transforming data

We need to be able to transform a `JokeResponse` object into a `Joke`.
Let's add a utility function at the bottom of the file:

```ts
function convertJokeResponseToJoke(response: JokeResponse): Joke {
  return {
    text: response.value.joke
  };
}
```

### Transforming Observable streams

Similarly to the [`map`][js-array-map] method of JavaScript arrays, Observables have a [`map`][observable-map] operator,
which allows you to transform each item emitted in the stream:

<p class='center'><img src='images/observable-map.png' class='w50' /></p>

To use it, you need to import it and use the Observable's `pipe` method:

```ts
// Other imports...
*import { map } from 'rxjs/operators';

// ...
  getJoke(): Observable<Joke> {
    return this.httpClient
      .get<JokeResponse>('https://api.icndb.com/jokes/random')
*     .pipe(map(convertJokeResponseToJoke));
  }
```



## Component interaction

As described earlier, components are Angular's fundamental building blocks.

We're going to add a few features to our application:

* The ability to **vote** on which are the best jokes.
* The ability to see the **total** number of votes and how many votes the **best** joke has had.
* The ability to **clear** all the collected votes.

<!-- slide-column -->

We could implement all of this in `AppComponent`,
but that would not be viable in a real-world scenario with more complex features.
When you have a complex page with multiple areas that each have their specific logic,
it's good practice to **isolate each part into a component**:

<!-- slide-column -->

<p class='center'><img src='images/master-detail-components.png' /></p>

### Adding votes to the model

Update the `Joke` model to have an additional `votes` property:

```ts
export class Joke {
  text: string;
* votes: number;
}
```

You need to update `src/app/app.component.ts` to set the initial votes to `0`:

```ts
this.jokes = [
  { text: 'Knock knock'`, votes: 0` },
  { text: 'The cake is a lie'`, votes: 0` }
];
```

You also need to update the `convertJokeResponseToJoke` function in `src/app/services/joke.service.ts`:

```ts
function convertJokeResponseToJoke(response: JokeResponse): Joke {
  return {
    text: response.value.joke,
*   votes: 0
  };
}
```

### Creating a child component

Let's generate our **new component**, the `JokeComponent`:

```ts
$> ng generate component --spec false components/joke
```

This will create a component in the `src/app/components/joke` directory,
with its own TypeScript definition, HTML template and CSS styles.

#### The `JokeComponent`

The responsibility of the new `JokeComponent` will be to display a `Joke` object,
and to provide a button to vote on the joke.

Let's add a `joke` property to the new component:

```ts
// Other imports...
*import { Joke } from '../../models/joke';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {
* joke: Joke;
  // ...
}
```

And update the component's template to display the joke's text:

```html
{{ joke.text }}
```

### Passing data from parent to child with input binding

We want the joke to be provided by the parent component (`AppComponent`).
It's an **input** of the `JokeComponent`.
Annotating a component's property with the [`@Input`][angular-docs-input] decorator marks it as an **input property** which can be set by a parent component:

```ts
// Other imports...
import { Component, `Input`, OnInit } from '@angular/core';

// ...
export class JokeComponent implements OnInit {
  `@Input()`
  joke: Joke;
  // ...
}
```

You can now use the `JokeComponent` in the main component's template.
You need to create an `<app-joke>` tag (matching the component's selector),
and to set the `joke` input property:

```html
<ul>
  <li *ngFor='let joke of jokes'>`<app-joke [joke]='joke'></app-joke>`</li>
</ul>
```

### Voting on jokes

Add a `vote()` method to `JokeComponent`:

```ts
vote() {
  this.joke.votes++;
}
```

Add these 2 lines to the component's template:

```html
({{ joke.votes }} votes)
<button type='button' (click)='vote()'>+1</button>
```

You can now vote!

### Displaying global voting information

Let's now display the **total number of votes** and the **best vote** on the page.
That's the job of the main component, since a `JokeComponent` only knows about its own joke,
so it can't know the total number of votes or whether its number of votes is the highest.

Add this information to the component:

```ts
export class AppComponent {
  // ...
* bestVote: number;
* totalVotes: number;

  constructor(private jokeService: JokeService) {
*   this.bestVote = 0;
*   this.totalVotes = 0;
    // ...
  }
  // ...
}
```

And display it in the template:

```html
<p>Total votes: {{ totalVotes }}, best vote: {{ bestVote }}</p>
```

### Output from child components

The vote button is in the child component's template, so `AppComponent` can't put an event listener on it directly.
Instead, we need our `JokeComponent` to have an **output** that its parent can listen to.

Annotating a component's property with the [`@Output`][angular-docs-output] decorator marks it as an **output property**.
An output property must be an [`EventEmitter`][angular-docs-event-emitter] (or an Observable).
Let's add one to `JokeComponent` now:

```ts
import { Component, `EventEmitter`, Input, OnInit, Output } from '@angular/core';

// ...
export class JokeComponent implements OnInit {
  // ...
* @Output()
* voted: EventEmitter<Joke>;

  constructor() {
*  this.voted = new EventEmitter();
  }

  vote() {
    this.joke.votes++;
*   this.voted.emit(this.joke);
  }
}
```

### Listening to child component events from a parent

Let's add an `onJokeVoted()` method to `AppComponent`:

```ts
onJokeVoted(joke: Joke) {
  this.totalVotes++;
  if (joke.votes > this.bestVote) {
    this.bestVote = joke.votes;
  }
}
```

We want this method to be called every time a vote button is clicked in a child `JokeComponent`.

From the parent's point of view, an **output property** of a child component is **just like any other event**.
You bind to it using Angular's `(event)='expression'` syntax, exactly like you bind to `(click)` on a `<button>` tag:

```html
<app-joke [joke]='joke' `(voted)='onJokeVoted(joke)'`></app-joke>
```

### Clearing the votes

Now that our components are already plugged together,
adding the functionality to **clear the votes** is trivial.

Add the `clearVotes()` method to the main component.
It simply resets all votes to zero, including the jokes':

```ts
clearVotes() {
  this.bestVote = 0;
  this.totalVotes = 0;
  this.jokes.forEach(joke => joke.votes = 0);
}
```

And add a button to call it in the template:

```html
<button type='button' (click)='clearVotes()'>Clear votes</button>
```

It just works!

The `Joke` objects in the `JokeComponent` children are the same objects as the ones in the main component's `jokes` array, bound through Angular's input properties.
When you modify them in any component, Angular automatically updates all the relevant templates.

### More component interaction

These were just a few examples of how to communicate between components.

There are other ways to do it, like injecting the same **service** into multiple components.
This can be useful if two components must communicate but neither is a parent of the other, so they cannot use inputs or outputs.

Read the [documentation][angular-component-interaction] to learn more.



## Forms

Angular provides **validation** services for forms and controls.
These validations are performed **client-side** for a better user experience: the user gets **instant feedback**.

However, keep in mind that although this provides a good user experience, it can easily be circumvented and thus **cannot be trusted**.
**Server-side validation is still necessary** for a secure application.



### HTML validations

HTML 5 has [built-in validation attributes][html-input] to define validations on your form inputs (e.g. `<input>`, `<textarea>`, etc):

Attribute   | Description
:---        | :---
`min`       | Minimum value for a number
`max`       | Maximum value for a number
`minlength` | Minimum length for a string
`maxlength` | Maximum length for a string
`pattern`   | Regular expression for a string
`required`  | Required field

You simply add them to the HTML tag:

```html
<input type='text' `required minlength=2` />
```

Usually the **browser** performs these validations.
But Angular **overrides** these and provide its own implementation.
This allows you to add **more complex validations and interaction**.



### Creating a form

Let's turn our lonely greeting input field into a proper form:

* Wrap that part of the template in a `<form>` tag.
* Add a `name` attribute to the input field (required by Angular).
* Add a `required` attribute to the input field to have some validation.
* Add a submit `<button>` tag to complete the form.

```html
`<form>`
  <p>
    <input
      type='text' placeholder='Who are you?' [(ngModel)]='greeting'
      `name='greeting' required` />

    `<button type='submit'>Submit</button>`
  </p>
`</form>`
```

#### Updating the component

Let's now make it so that the greeting will only be displayed if submitted through the form.
We need to add a separate property to our component:

* The `greeting` property will represent the value of the input field.
* The `displayedGreeting` property will represent the submitted value (which will no longer be bound to the input field).

We also need a new `displayGreeting()` method which will take the current value of `greeting` and copy it to `displayedGreeting`:

```ts
// ...
export class AppComponent {
  // ...
  greeting: string;
* displayedGreeting: string;
  // ...

* displayGreeting() {
*   this.displayedGreeting = this.greeting;
*   console.log('Greeting displayed');
* }
}
```

#### Listening to form submit events

Update the component's template to reflect the fact that we now want to display `displayedGreeting` instead of `greeting`:

```html
<p *ngIf='displayedGreeting'>
  {{ hello(displayedGreeting) }}
</p>
```

Bind the new `displayGreeting()` method to the form's `submit` event to make it work:

```html
<form `(submit)='displayGreeting()'`>
```



### Checking the validation state

You might have noticed that we have marked the input field as **required**,
but that the user can **still submit the form** when it is invalid (i.e. the input field is empty).

That's not very user-friendly.
We're going to make the following improvements:

* **Prevent the form's submission** if it has invalid fields.
* **Disable the submit button** if the form has invalid fields.
* **Display an error message** when the greeting input field contains an invalid value.
* **Set the input field background color to red** if it contains an invalid value.

#### Checking whether the form is valid in code

In Angular, any `<form>` tag is enriched by the [`NgForm`][angular-docs-ng-form] directive.
You can retrieve the instance of the directive attached to the form by using a [**template reference variable**][angular-template-reference-variable]
(`#greetingForm` in this example):

```html
<form `#greetingForm='ngForm'` (submit)='displayGreeting(`greetingForm`)'>
```

We can now update the implementation of `displayGreeting()` to add this new argument.

[`NgForm`][angular-docs-ng-form] must be imported from `@angular/forms`.
This class provides, among other things, a `valid` (or `invalid`) attribute to check whether all the fields are valid or not:

```ts
*import { NgForm } from '@angular/forms';
// ...

displayGreeting(`form: NgForm`) {
  `if (form.valid) {`
    this.displayedGreeting = this.greeting;
    console.log('Greeting displayed');
  `}`
}
```

#### Disabling the submit button if the form is invalid

As you've seen, the template reference variable is available in the template itself,
since we passed it to `displayGreeting()` as an argument.

You can also bind other template elements to it or to its attributes.
We'll do that to disable the submit button when the form is invalid:

```html
<button type='submit' `[disabled]='greetingForm.invalid'`>Submit</button>
```

### Foo

```html
<form #greetingForm='ngForm' (submit)='displayGreeting(greetingForm)'>
  <p>
    <input type='text' placeholder='Who are you?' [(ngModel)]='greeting' name='greeting' #greetingInput='ngModel' required />
    <button type='submit' [disabled]='greetingForm.invalid'>Submit</button>
  </p>
  <p *ngIf='greetingInput.invalid && greetingInput.dirty'>
    Name is required
  </p>
</form>
<p *ngIf='displayedGreeting'>
  {{ hello(displayedGreeting) }}
</p>
```

```ts
// ...
export class AppComponent {
  // ...
  greeting: string;
* displayedGreeting: string;
  // ...

  displayGreeting(form: NgForm) {
    if (form.valid) {
      this.displayedGreeting = this.greeting;
    }
  }
}
```



### Binding to form state

Any form in an Angular application is an instance of [FormController][angular-form-controller].
Any input with the `ng-model` directive is an instance of [NgModelController][angular-ng-model-controller].
By adding a `name` attribute to these elements, you can **bind form state to the scope**:

```html
<form `name='userForm'` ng-submit='submit()' novalidate>
  <input type='text' ng-model='user.name' `name='name'` `required` />
  <div ng-if='`userForm.name.$error.required`'>Tell us your name.</div>
</form>
```

In this example, adding `name='userForm'` to the form **puts the `userForm` variable in the scope**:
this is the `FormController` instance.

Adding `name='name'` to the form field **puts the `userForm.name` variable in the scope**:
this is the `NgModelController` instance.

#### Form and `ng-model` controllers

Form and `ng-model` controllers have the following useful properties:

Ctrl       | Property     | Description
:---       | :---         | :---
Form       | `$pristine`  | True if the user has not interacted with the form
Form       | `$dirty`     | True if the user has interacted with the form
Form       | `$valid`     | True if all inputs are valid
Form       | `$invalid`   | True if at least one input is invalid
Form       | `$pending`   | True if an asynchronous validation is pending
Form       | `$submitted` | True if the form has been submitted (even if invalid)
`ng-model` | `$error`     | An object with all failing validations as keys
`ng-model` | `$untouched` | True if the input has not lost focus yet
`ng-model` | `$touched`   | True if the input has lost focus
`ng-model` | `$pristine`  | True if the user has not interacted with the input
`ng-model` | `$dirty`     | True if the user has interacted with the input
`ng-model` | `$valid`     | True if the input has no errors
`ng-model` | `$invalid`   | True if there is at least one error for the input

#### Complete validation example

```html
<form `name='userForm'` ng-submit='submit()' novalidate>
  <label>
    Name:
    <input type='text' ng-model='user.name' `name='name'` required minlength=2 />
  </label>
  <div ng-if='`userForm.name.$dirty`'>
    <div ng-if='`userForm.name.$error.required`'>Tell us your name.</div>
    <div ng-if='`userForm.name.$error.minlength`'>Your name is too short.</div>
  </div>

  <label>
    E-mail:
    <input type='email' ng-model='user.email' `name='email'` required />
  </label>
  <div ng-if='`userForm.email.$dirty`'>
    <span ng-if='`userForm.email.$error.required`'>Tell us your e-mail.</span>
    <span ng-if='`userForm.email.$error.email`'>This is not a valid e-mail.</span>
  </div>

  <input type='submit' ng-disabled='`userForm.$invalid`' value='Save' />
</form>
```

See it in action [here][angular-codepen-form-validation].
Read the [documentation][angular-forms] to learn more.

#### Custom synchronous validators

AngularJS provides basic implementation for most common HTML 5 validations,
but sometimes you need to add your own.
You can do that by defining a **validation directive**:

```js
var INTEGER_REGEXP = /^-?\d+$/;
app.directive('integer', function() {
  return {
    `require: 'ngModel',` // Gives access to the ng-model controller
    link: function(scope, element, attrs, `ngModelCtrl`) {
      `ngModelCtrl.$validators.integer` = function(modelValue, viewValue) {
        if (ngModelCtrl.$isEmpty(modelValue)) {
          return true; // Consider an empty value to be valid
        }

        // Return true if the string value is an integer
        `return INTEGER_REGEXP.test(viewValue);`
      };
    }
  };
});
```

Using it is as simple as applying the directive as an attribute:

```html
<input type='number' ng-model='size' name='size' min='0' max='10' `integer` />
```



## Resources

**Documentation**

* [Angular developer guide][angular-guide]
  * [Angular Forms][angular-forms]
* [Angular API reference][angular-api]
  * [Angular Components][angular-components]
  * [Angular Directives][angular-directives] ([built-in][angular-directives-list])
  * [Angular input][angular-input]
* [HTML input tag][html-input]

**Further reading**

* [A guide to web components][a-guide-to-web-components]
* [Angular 2 components][angular-2-series-components]
* [JavaScript promises][js-promises-subject]
* [Promises in Angular][angular-promises]



## TODO

* Explain `[attr]` & `(event)`
* Enrich forms section
* Move directive section
* Pipes
* Get HTTP response
* Mention reactive forms



[a-guide-to-web-components]: https://css-tricks.com/modular-future-web-components/
[ajax]: https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
[angular]: https://angular.io
[angularjs]: https://angularjs.org/
[angular-api]: https://docs.angularjs.org/api
[angular-built-in-filters]: https://docs.angularjs.org/api/ng/filter
[angular-codepen]: http://codepen.io/AlphaHydrae/pen/LxoRze?editors=1010#0
[angular-codepen-form-validation]: http://codepen.io/AlphaHydrae/pen/EWZOOR?editors=1011
[angular-codepen-scope-hierarchy]: http://codepen.io/AlphaHydrae/pen/ryjaXN?editors=1010#0
[angular-codepen-scope-components]: http://codepen.io/AlphaHydrae/pen/LWxVzj?editors=1010#0
[angular-component-interaction]: https://angular.io/guide/component-interaction
[angular-component-styles]: https://angular.io/guide/component-styles
[angular-components]: https://docs.angularjs.org/guide/component
[angular-directives]: https://docs.angularjs.org/guide/directive
[angular-directives-list]: https://docs.angularjs.org/api/ng/directive
[angular-docs-component]: https://angular.io/api/core/Component
[angular-docs-directive]: https://angular.io/api/core/Directive
[angular-docs-event-emitter]: https://angular.io/api/core/EventEmitter
[angular-docs-http-client]: https://angular.io/guide/http
[angular-docs-injectable]: https://angular.io/api/core/Injectable
[angular-docs-input]: https://angular.io/api/core/Input
[angular-docs-ng-class]: https://angular.io/api/common/NgClass
[angular-docs-ng-for]: https://angular.io/api/common/NgForOf
[angular-docs-ng-if]: https://angular.io/api/common/NgIf
[angular-docs-ng-form]: https://angular.io/api/forms/NgForm
[angular-docs-ng-module]: https://angular.io/api/core/NgModule
[angular-docs-ng-plural]: https://angular.io/api/common/NgPlural
[angular-docs-ng-style]: https://angular.io/api/common/NgStyle
[angular-docs-ng-switch]: https://angular.io/api/common/NgSwitch
[angular-docs-output]: https://angular.io/api/core/Output
[angular-element]: https://docs.angularjs.org/api/ng/function/angular.element
[angular-form-controller]: https://docs.angularjs.org/api/ng/type/form.FormController
[angular-forms]: https://docs.angularjs.org/guide/forms
[angular-guide]: https://docs.angularjs.org/guide
[angular-input]: https://docs.angularjs.org/api/ng/directive/input
[angular-ng-model-controller]: https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
[angular-promises]: ../angular-promises/
[angular-starter]: https://github.com/MediaComem/comem-angular-starter#readme
[angular-structural-directives]: https://angular.io/guide/structural-directives
[angular-template-reference-variable]: https://angular.io/guide/template-syntax#ref-vars
[angular-testing]: https://angular.io/guide/testing
[angular-2-series-components]: http://blog.ionic.io/angular-2-series-components/
[chrome]: https://www.google.com/chrome/
[chrome-dev]: https://developers.google.com/web/tools/chrome-devtools/console/
[css-attribute-selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors
[di]: https://en.wikipedia.org/wiki/Dependency_injection
[html-history-api]: https://developer.mozilla.org/en-US/docs/Web/API/History_API
[html-input]: https://www.w3schools.com/tags/tag_input.asp
[intro-to-reactive-programming]: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[jquery]: http://jquery.com
[js]: ../js/
[js-array-map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[js-classes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[js-closures]: ../js-closures/
[js-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[js-promises-subject]: ../js-promises/
[ioc]: https://en.wikipedia.org/wiki/Inversion_of_control
[minification]: https://en.wikipedia.org/wiki/Minification_(programming)
[observable-map]: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map
[rxjs]: http://reactivex.io/rxjs/
[ts]: https://www.typescriptlang.org
[ts-subject]: ../ts
[web-components]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
