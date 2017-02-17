# Angular

<!-- START doctoc -->
<!-- END doctoc -->



## What is Angular?

<!-- slide-front-matter class: center, middle, image-header -->

<p class='center'><img src='images/angular.png' width='20%' /></p>

> "Angular is a complete **JavaScript front-end web application framework** created by Google to address many of the challenges of developing **rich single-page applications**."



### Traditional Model-View-Controller (MVC) architecture

In traditional MVC frameworks,
the application's **Controllers** receive the user's requests when navigating from page to page in the browser,
and respond by generating HTML **Views** from the **Model**.

<img src='images/mvc.png' width='100%' />



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



## Getting started

<!-- slide-front-matter class: center, middle -->



### Overview

<!-- slide-column -->

These are the main Angular elements:

* Scope
* Controllers
* Services
* 

<!-- slide-column -->

* Two-way binding
* Dependency injection



## Resources

* [Angular][angular]



[angular]: https://angular.io/
[html-history-api]: https://developer.mozilla.org/en-US/docs/Web/API/History_API
