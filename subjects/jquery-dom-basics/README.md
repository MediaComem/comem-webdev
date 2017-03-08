# jQuery - DOM Manipulation

Learn how to use the jQuery library for manipulating the DOM of a WebPage and, thus, creating interactivity.

<!-- slide-include ../../BANNER.md -->

**You will need**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)
* [Sublime Text][sublime] (recommended, any code editor will do... **except Notepad**)
* [Live-Server][ls] (should already be installed)

**Recommended reading**

* [JavaScript][js]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is this subject?](#what-is-this-subject)
  - [What?](#what)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Example file

This subject will use [this `index.html` file][ex-file] as illustration.

Be sure to download it and place it in a new project directory (e.g. `jquery-course`), if you want to try and follow with the examples.

> Note that this example file includes Bootstrap through a CDN. Feel free to change that to a local link if you'd prefer ([see here][local-bs]).

<!-- slide-front-matter class: center, middle -->

## What is jQuery

<!-- slide-front-matter class: center, middle, image-header -->

<p class='center'><img src='images/jquery-logo.png' width='30%' /></p>

> jQuery is a JavaScript (_hereafter JS_) library created in 2006 by John Resig, and originally designed to ease the creation of client-side JS script, especially regarding DOM manipulation.

> **This slide-deck is based on the `3.1.1` version of jQuery.**
> 
> **As such, some examples could be out-of-date.**

## Include jQuery

To add jQuery in your project, you can include it via a CDN link, in your `index.html` file:

```html
<body>
  ...
  <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
</body>
```

You can also [download the latest version][dl-jquery], and save the file in a `js` directory in your project directory. Then, include the file in your `index.html`:

```html
<body>
  ...
  <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
</body>
```
> Wait... am I not supposed to put my `<script>` tags in the `<head>`?
> 
> What are they doing right before the closing `</body>` tag?

### Script inclusions

It's considered a good practice to include JS scripts **at the end of your HTML page**.

> When your browser loads the JS, it doesn't just load the file. It also **parses** it.

Parsing the JS files **pauses the load of all other resources**, effectively blocking everythig until the JS has been completely parsed.

> This can result in **slow loading pages**, especially when you have multiple or big scripts.

Plus, loading JS files while the DOM is not forces you to start all your JS scripts with the `window.onlad = function {}` syntax.

> With the `<script>` tag at the end of the HTML file, you can be sure that your JS is loaded **after** the DOM is.

### Add custom script

We will write our JS code in a custom script file.

In the `js` directory insode your project directory, create a new `script.js` and include it at the bottom of your `index.html` page:

```html
<body>
  ...
  <script type="text/javascript" src="js/script.js"></script>
</body>
```
> Be extra-sure to include your custom `script.js` file **after** the inclusion of the jQuery file.

### Test everything

Add the following line in your `script.js` file, and save it:

```js
console.log($("body").jquery);
```
Start your project with `live-server` and access your browser console. You should see the following lines:

```bash
3.1.1
Live reload enabled.
```
> If it's the case, you're good to go. jQuery and your custom script are both correctly include in your project.
 
## jQuery documentation

Everything that is presented in this slide-deck can also be found in **the jQuery documentation**, along with lot of **examples** and **information**.

We highly recommend that you check it out.

[jQuery Documentation][jq-doc]

<!-- slide-front-matter class: center, middle -->

## Resources

**Documentation**

* [jQuery Documentation][jq-doc]

**Further reading**

[sublime]: https://www.sublimetext.com/
[chrome]: https://www.google.com/chrome/
[js]: ../js
[dl-jquery]: https://code.jquery.com/jquery-3.1.1.min.js
[ex-file]: https://gist.githubusercontent.com/Tazaf/2ca35d60688eec1281fd9546abe1f76a/raw/70c767db08e1e57b7db78df17258739d3ebeea2e/index.html
[jq-doc]: http://api.jquery.com/
[ls]: https://www.npmjs.com/package/live-server
[local-bs]: /bootstrap-basics/#5