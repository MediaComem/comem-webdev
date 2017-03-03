# Bootstrap - Layout management

<!-- slide-include ../../BANNER.md -->

Learn how Bootstrap helps you structure your HTML layouts, using both its grid system and all available responsive classes.

**You will need**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)
* [Sublime Text][sublime] (recommended, any code editor will do... **except Notepad**)

**Recommended reading**

* [Project setup][projset]
* [Bootstrap - Basics][bootstrap]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Example file](#example-file)
- [Default HTML layout](#default-html-layout)
  - [Altering the default layout](#altering-the-default-layout)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Example file

This subject will use [this `index.html` file][bsef] as illustration.

Be sure to download it, if you want to try and follow with the examples.

<!-- slide-front-matter class: center, middle -->

## Default HTML layout

The default layout of an HTML page is very simple: it's almost inexistant.

* ![][block] **Block elements** (such as `<div>`, `<p>`, `<table>`) start a new "line" and are stack on one another.
* ![][inline] **Inline elements** (such as `<span>`, `<a>`, `<button>`) are placed one after another in the same "line".

> You can place inline elements inside block elements.
> 
> This is called the **flow of the page**.

<p class="center"><img class="shadow" src="images/default-structure.jpg" /></p>

### Altering the default layout

CSS offers a bunch of properties to alter this default behavior, allowing for more creative and custom page layouts.

> We won't see these properties in detail in this course.

* `display`: you can force an inline component to behave like a block element, and *vice-versa*.
* `float`: you can force-push an element to either the left-side or the right-side of the page. This pull the element out of the flow.
* `position`: you can force an element to a special position (*`fixed`, `absolute`, `relative`*), that can pull it out of the flow.

Using these properties can be quite tedious, especially if you want something **stable and compatible** with all browsers.

> A new layout paradigm, called **FlexBox** has been introduce with CSS3.
> 
> It offers a very flexible and powerful way to create layouts, and a great consistency regarding the positionning of elements.

## Grid systems

<!-- slide-column -->

A Grid System is a way of creating layouts that's been inherited from graphic designers.

The idea is quite simple: you divide the space at your disposal in **columns** (usually an even number), separated by a **gutter**.

When you place your elements on the layout, they **must** be as wide as one or more columns.
> An element mustn't stop in the **middle of a column**. That would completely defeat the purpose of having a grid system in place.

<!--slide-column -->

<p><img src="images/grid-example.jpg" width="100%" /></p>

[bootstrap]: ../bootstrap
[projset]: ../masrad-project-setup
[chrome]: https://www.google.com/chrome/
[sublime]: https://www.sublimetext.com/
[bsef]: https://gist.githubusercontent.com/Tazaf/18732ef01164f7b6348443c4c4748f42/raw/9f1dec778546a4d9741f1d17b08212c5606c26ca/index.html
[block]: ./images/blocks.jpg
[inline]: ./images/inline.jpg