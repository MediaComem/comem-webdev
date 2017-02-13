# Express

Requirements:

* [Node.js][node] 4+
* [Google Chrome][chrome] (recommended, any browser with developer tools will do)
* [Postman][postman] (recommended, any tool that makes raw HTTP requests will do)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is express?](#what-is-express)
- [Express: core functionality](#express-core-functionality)
- [Install express](#install-express)
- [Express uses a Movel-View-Controller (MVC) structure](#express-uses-a-movel-view-controller-mvc-structure)
- [Express file structure](#express-file-structure)
- [Express entry point (app.js)](#express-entry-point-appjs)
- [package.json](#packagejson)
- [Express middleware](#express-middleware)
  - [Express configuration](#express-configuration)
  - [Adding your own middleware](#adding-your-own-middleware)
- [Express routing](#express-routing)
  - [The home page](#the-home-page)
  - [Routing](#routing)
  - [Router](#router)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## What is express?

<!-- slide-front-matter class: center, middle -->

Fast, unopinionated, **minimalist** web framework for Node.js



## Core functionality

<!-- slide-column 33 -->

**Routing**

Map HTTP methods and URLs to controllers

<!-- slide-column 33 -->

**Middleware**

Intercept and modify HTTP requests and responses during request-response processing

<!-- slide-column 33 -->

**Template engines**

Render views with pluggable template engines

<!-- slide-container -->

Express is **minimalist**: it doesn't provide much out of the box.
Use the many **middleware** packages at your disposal to build more complex applications.



### Install the express generator

It's not hard to create an express app from scratch, but we'll use **express-generator** to quickly create an application skeleton:

```bash
$> npm install -g express-generator
```

It provides the `express` command:

```bash
$> express --help

  Usage: express [options] [dir]

  Options:

    -h, --help           output usage information
        --version        output the version number
    -e, --ejs            add ejs engine support
        --pug            add pug engine support
        --hbs            add handlebars engine support
    -H, --hogan          add hogan.js engine support
    -v, --view <engine>  add view <engine> support (ejs|hbs|hjs|jade|pug|...
    -c, --css <engine>   add stylesheet <engine> support (less|stylus|...
        --git            add .gitignore
    -f, --force          force on non-empty directory
```



### Generate a skeleton application

```bash
$> cd /path/to/projects
$> express my-app

   create : my-app
   create : my-app/package.json
   create : my-app/app.js
   create : my-app/public
   create : my-app/public/javascripts
   create : my-app/public/images
   create : my-app/public/stylesheets
   create : my-app/public/stylesheets/style.css
   create : my-app/routes
   create : my-app/routes/index.js
   create : my-app/routes/users.js
   create : my-app/views
   create : my-app/views/index.jade
   create : my-app/views/layout.jade
   create : my-app/views/error.jade
   create : my-app/bin
   create : my-app/bin/www

   install dependencies:
     $ cd my-app && npm install

   run the app:
     $ DEBUG=my-app:* npm start
```

#### The server component

Let's take a look at the generated files:

```txt
package.json
app.js
routes
  index.js
  users.js
bin
  www
```

* `package.json` is used to track **dependencies** with npm
* `app.js` is the **main script** that will create and configure the express app
* `routes` contains files that define the app's **routes and controllers**
* `bin/www` is the **entrypoint** (the script to execute to launch the app)

The above files are executed **locally** on your machine when you develop,
or **on the server** when you deploy to a host.

#### The client component

The rest of the files are:

```txt
views
  index.jade
  layout.jade
  error.jade
public
  javascripts
  images
  stylesheets
    style.css
```

* `views` contains the page templates (written in [Jade][jade] by default)
  that will be rendered to HTML by the server and served to the browser
* `public` contains **static files** that will be served to the browser
  * `public/javascripts` contains the client-side JavaScript that will be executed in the browser
  * `public/images` contains images used in your app's templates
  * `public/stylesheets` contains your app's CSS stylesheets

#### The package.json file

Let's take a look at the generated `package.json`:

```json
{
  "name": "express-demo",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.16.0",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.0",
    "express": "~4.14.1",
    "jade": "~1.11.0",
    "morgan": "~1.7.0",
    "serve-favicon": "~2.3.2"
  }
}
```

* There is a **start script** configured to launch the app with `npm start`
* A few **dependencies** are pre-installed to provide basic web app functionality



## Express entry point (app.js)

TODO: app.js code

* Dependencies
* npm packages
* local modules
* start the server
* async callback



## Express middleware

* Incoming HTTP requests can be processed by multiple components, organized in a pipeline
* The components can inspect and even modify the incoming HTTP requests and HTTP responses (think about security, compression, etc.).
* Express.js calls these components "middleware" functions
* Middleware can be chained. They can intercept requests at different levels (all requests, requests under a certain path, requests handled by a specific router, etc.)
* Built-in middleware components are available (in separate npm modules).
* We will use the express.static middleware to serve static content (e.g. HTML)

https://expressjs.com/en/guide/using-middleware.html

* Application-level vs. routing-level middleware vs. error-handling middleware



### Express configuration

TODO: check what the express generator generates

* third-party middleware packages
* use the middleware one after the other; each can modify the request, send a response, or pass the request along to the next middleware



### Adding your own middleware

* after standard middleware
* before error handling



## Express routing

* Routing consists in finding some piece of code (a function) to execute when an HTTP request has been issued.
* We will see later (in a few weeks) that routing can happen on the client side. Today, we are looking at routing on the server side.
* Routing is part of the typical Model-View-Controller (MVC) pattern implemented by web frameworks (not only in JavaScript, but also in other languages). 
* Routing consists in finding the right controller when a request comes in. 
* The controller will then get a model and delegate the rendering of a view to a template engine.



### The home page

* Express router
* Add the router as middleware (filtered by path)
* Define a route: `GET /`



### Routing

https://expressjs.com/en/guide/routing.html

* Route methods (GET, POST, PUT)
* Route paths (`/`, `/home`, `/students`)
* Request and response objects



### Router

* For large applications, it is better to split the controllers in multiple, isolated components. You should use multiple routers for that purpose.
* express.Router() creates a new router. (no need for r = new Router())

https://expressjs.com/en/4x/api.html#router



## Resources

http://expressjs.com/en/4x/api.html



[chrome]: https://www.google.com/chrome/
[jade]: https://www.npmjs.com/package/jade
[node]: https://nodejs.org/en/
[postman]: https://www.getpostman.com
