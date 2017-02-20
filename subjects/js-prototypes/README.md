# JavaScript Prototypes

<!-- slide-include ../../BANNER.md -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [JavaScript has **prototypal inheritance**](#javascript-has-prototypal-inheritance)
  - [ES5 has no support for **classes**](#es5-has-no-support-for-classes)
  - [Every object **inherits** from a **prototype** object](#every-object-inherits-from-a-prototype-object)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## JavaScript has **prototypal inheritance**

<!-- slide-front-matter class: center, middle -->



### ES5 has no support for **classes**

TODO: ES6 classes

There are 3 ways to create objects.

```js
// Create an object with a literal
var person = {
  firstName: "olivier",
  lastName: "liechti"
};

// Create an object with a prototype
var child = Object.create(person);

// Create an object with a constructor
var child = new Person("olivier", "liechti");
```

* **class** is a reserved word in JavaScript, but it is not used in the current version of the language (reserved for the future).
* A **constructor** is a function like any other (uppercase is a coding convention).
* It is the use of the **new** keyword that triggers the object creation process.



### Every object **inherits** from a **prototype** object

TODO: add graph

```js
// Prints "Skywalker" on the console
console.log(child.lastName);
```

* Every object inherits from a prototype object. It **inherits and can override** its properties, including its methods.
* Objects created with object literals inherit from **Object.prototype**.
* When you access the property of an object, JavaScript **looks up the prototype chain** until it finds an ancestor that has a value for this property.



## TODO

* [Symbols][js-symbol]

  The data type "symbol" is a primitive data type having the quality that values of this type can be used to make object properties that are anonymous.
  Every symbol value returned from Symbol() is unique.  A symbol value may be used as an identifier for object properties; this is the data type's only purpose.
