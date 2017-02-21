# JavaScript

<!-- slide-include ../../BANNER.md -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is JavaScript?](#what-is-javascript)
  - [JavaScript is still evolving](#javascript-is-still-evolving)
  - [JavaScript ES6 support](#javascript-es6-support)
- [JavaScript types](#javascript-types)
  - [JavaScript has 6 primitive data types](#javascript-has-6-primitive-data-types)
  - [JavaScript has **dynamic** objects](#javascript-has-dynamic-objects)
  - [Array are **objects**](#array-are-objects)
  - [JavaScript is **untyped**](#javascript-is-untyped)
- [JavaScript supports [first-class functions][first-class-functions]](#javascript-supports-first-class-functionsfirst-class-functions)
  - [Storing functions in variables or data structures](#storing-functions-in-variables-or-data-structures)
  - [Returning functions from a function](#returning-functions-from-a-function)
  - [Passing functions as arguments](#passing-functions-as-arguments)
  - [Transforming data with functions](#transforming-data-with-functions)
- [Variables](#variables)
  - [Defining variables](#defining-variables)
  - [Dynamic or constant variables](#dynamic-or-constant-variables)
  - [The function scope](#the-function-scope)
  - [The block scope](#the-block-scope)
  - [The (evil) global scope](#the-evil-global-scope)
- [String syntax](#string-syntax)
- [JSON](#json)
  - [JSON who?](#json-who)
  - [Example](#example)
  - [Using JSON](#using-json)
- [TODO](#todo)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## What is JavaScript?

<!-- slide-front-matter class: center, middle -->

> JavaScript is a high-level, **dynamic**, **untyped**, and interpreted programming language.
> Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web.

> JavaScript is **prototype**-based with **first-class functions**, making it a multi-paradigm language, supporting **object-oriented**, **imperative**, and **functional** programming styles.



### JavaScript is still evolving

It has been standardized in the [ECMAScript][es] language specification.

<img src='images/timeline.png' width='100%' />

**ECMAScript 2015** (also known as ECMAScript 6 or ES6) added iterators and for/of loops, Python-style [generators][js-generators] and generator expressions, [arrow functions][js-arrow-functions], binary data, typed arrays, collections (maps, sets and weak maps), [promises][js-promise], number and math enhancements, reflection, and [proxies][js-proxy].

**ECMAScript 2017** (ES8) will add [async/await functions][js-async] and [shared memory and atomics][js-shared-memory].



### JavaScript ES6 support

There are features from ES6 that are **not yet fully supported** on all browsers.

In client-side code running in the **browser**, you should stick with **ES5** or use a JavaScript compiler like [Babel][babel] to turn your ES6+ code into compatible ES5 code before releasing it.

In server-side code running with the latest **Node.js** versions, all **ES6** features are supported except for [imports][js-imports].



## JavaScript types

<!-- slide-front-matter class: center, middle -->



### JavaScript has 6 primitive data types

<!-- slide-column 70 -->

```js
var aString = "HEIG-VD";
var aNumber = 3.12;
var aBoolean = true;
var nullValue = null;
var undefinedValue;
var aSymbol = Symbol('foo');

console.log(typeof aString); // "string"
console.log(typeof aNumber); // "number"
console.log(typeof aBoolean); // "boolean"
console.log(typeof nullValue); // "object"
console.log(typeof undefinedValue); // "undefined"
console.log(typeof aSymbol); // "symbol"

// There is no integer type
console.log(isInteger(aNumber)); // false
console.log(typeof 4); // "number"
console.log(isInteger(4)); // true

// Symbols are unique identifiers
console.log(Symbol('foo') == aSymbol); // false
```

<!-- slide-column 30 -->

The types are:

* String
* Number
* Boolean
* Null
* Undefined
* Symbol (**ES6**)

<!-- slide-container -->

* Note that `null` is a type, but `typeof null === object`.
  This is a [remnant][js-typeof-null] from the first version of JavaScript.



### JavaScript has **dynamic** objects

<!-- slide-column 60 -->

```js
// Let's create an object
var person = {
  firstName: 'John',
  lastName: 'Doe'
};

// We can dynamically add properties
person.gender = 'male';

var property = 'zip';
person[property] = 1446;

// And delete them
delete person.firstName;

// And list them
for (var key in person) {
  console.log(key + ': ' + person[key]);
}
```

```txt
lastName: John
gender: male
zip: 1446
```

<!-- slide-column 40 -->

Objects have **no class**, they are **dynamic bags** of properties.

Every object has a **different list of properties**.



### Array are **objects**

They are list-like objects with numeric keys.

```js
// Let's create an array
var fruits = [ 'apple', 'pear' ];

console.log(typeof fruits); // "object"

// Iterate over it
for (var i = 0; i < fruits.length; i++) {
  console.log('fruit ' + i + ' is ' + fruits[i]);
}

// fruit 0 is apple
// fruit 1 is banana
```

We'll learn more about arrays later.



### JavaScript is **untyped**

Values have a type, but **variables don't**.
When you declare a variable, you don't specify a type.

```js
var aVariable = "aString";
console.log(typeof aVariable); // "string"

aVariable = 3.12;
console.log(typeof aVariable); // "number"

aVariable = true;
console.log(typeof aVariable); // "boolean"

aVariable = [ 1, 2, 3 ];
console.log(typeof aVariable); // "object"

aVariable = {
  aProperty: "aValue"
};
console.log(typeof aVariable); // "object"
```

The type can **change** over time.



## JavaScript supports [first-class functions][first-class-functions]

<!-- slide-front-matter class: center, middle -->

> "A programming language is said to have first-class functions if it treats functions as first-class citizens.

> Specifically, this means the language supports **passing functions as arguments** to other functions, **returning them** as the values from other functions, and **assigning them to variables** or **storing them in data structures**."



### Storing functions in variables or data structures

A JavaScript function isn't a special construct linked to a class like in Java.
It can be stored in variables like any other value.

```js
// Store a function in a variable
var hello = function(name) {
  console.log('Hello ' + name + '!');
};

// The hello variable now holds a function
console.log(typeof(hello)); // "function"

// You can call it
hello('World'); // "Hello World!"

// Store a function as an object's property
var anObject = {
  aProperty: function() {
    return 42;
  }
};

// That property now holds a function as its value
console.log(typeof(anObject.aProperty)); // "function"

var value = anObject.aProperty();
console.log(value); // 42
```



### Returning functions from a function

```js
// Let's define a function that returns a function
function makeSquareFunction() {
  return function(n) {
    return n * n;
  };
}

// By calling it, we get a function
var square = makeSquareFunction();
console.log(typeof(square)); // "function"

var result = square(5);
console.log(result); // 25
```

Note that functions can be **anonymous** (i.e. they have no name),
like the function returned from `makeSquareFunction`:

```js
return function(n) {
  return n * n;
};
```



### Passing functions as arguments

A function can take another function as an argument.

```js
function hello(name) {
  console.log('Hello ' + name + '!');
}

function callIt(func) {
  func('World');
}

callIt(hello); // "Hello World!"
```

#### Function as argument exercise

```js
// Let's define a couple of arithmetic function
function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}

// Define a function that takes two numbers
// and a function to apply to those numbers
function compute() {
  // Give me some arguments and implement me!
}

// Call compute with "add"
var value = compute(2, 4, add);
console.log(value); // 6

// Call compute with "multiply"
value = compute(2, 4, multiply);
console.log(value); // 8
```

Try to [implement it!][ex-function-as-argument]

Use the console in your browser's developer tools to see what the `console.log` calls print.



### Transforming data with functions

These properties of functions enable powerful functional programming patterns:

```js
// Define an array of people objects
var people = [
  { firstName: 'John', lastName: 'Doe' },
  { firstName: 'John', lastName: 'Smith' },
  { firstName: 'Deborah', lastName: 'Smith' }
];

// Define a function that takes a person and returns their last name
function getName(person) {
  return person.name;
}

// The "map" function of arrays returns an array of the same size,
// but with each element "mapped" or "transformed" using the provided
// function
var lastNames = people.map(getName);

// We transformed an array of people into an array of last names
console.log(lastNames); // [ "Doe", "Smith", "Smith" ]
```



## Variables

<!-- slide-front-matter class: center, middle -->



### Defining variables

There are three ways to define a variable in JavaScript:

```js
// ES5
var aString = 'foo';

// ES6
let aNumber = 42;
const aBoolean = true;
```

Note that `var` always works, but `let` and `const` are only available in **ES6** and later versions.



### Dynamic or constant variables

Variables declared with `var` or `let` are dynamic.
Their value can **change** over time.

```js
var aString = 'foo';
let aNumber = 24;

console.log(aString); // "foo"
console.log(aNumber); // 24

aString = 'bar';
aNumber = 25;

console.log(aString); // "bar"
console.log(aNumber); // 25
```

Variables declared with `const` cannot change.
They are **constants**:

```js
const theMeaningOfLife = 42;

theMeaningOfLife = 43; // TypeError: Assignment to constant variable.
```



### The function scope

Variables declared with `var` in a function are visible **everywhere in that function**.
Note that they are **NOT block-scoped** like in most languages.

```js
function logThings(things) {

  var numberOfThings = things.length;

  for (var i = 0; i < numberOfThings; i++) {
    var thing = things[i];
    console.log(thing);
  }

  console.log('Number of things: ' + numberOfThings);
  console.log('Last thing: ' + thing);
  console.log('Iterator: ' + i);
}

logThings([ 'apple', 'banana', 'pear' ]);

// "apple"
// "banana"
// "pear"
// "Number of things: 3"
// "Last thing: pear"
// "Iterator: 3"
```



### The block scope

The `let` and `const` keywords introduced in **ES6** create **block-scoped** variables,
only visible in the block, statement or expression on which they are used.

```js
function logThings(things) {

  const numberOfThings = things.length;

  for (let i = 0; i < numberOfThings; i++) {
    let thing = things[i];
    console.log(thing);
  }

  console.log('Number of things: ' + numberOfThings);
  console.log('Last thing: ' + thing);
}

// "apple"
// "banana"
// "pear"
// "Number of things: 3"
// ReferenceError: thing is not defined
```

It is recommended to use them instead of `var` in **ES6-compatible** environments.



### The (evil) global scope

Variables declared with `var` outside of any function are **global variables**, accessible anywhere.

```js
// A global variable
var name = 'World';

function hello() {

  // We can use "name" even though it's not an argument
  // of the function, because it's global
  console.log('Hello ' + name + '!');

  // It's a bad idea to use them because anyone can
  // change their value and mess up your program
  name = 'Bob';
}

hello(); // "Hello World!"
hello(); // "Hello Bob!"
```

You should **almost never use them**.



#### When it's okay to use the global scope

In an **HTML page**, all loaded scripts share the same global scope.

In that context, ES5 libraries expose global variables so that your code can use them.
For example, jQuery provides the **$** global variable for easy access.

In a **Node.js script**, the global scope is limited to the file you're in, so it's okay to use it.

If you're not writing either one of those, just **don't use global variables**.



#### Oops, global scope

If you forget the `var`, `let` or `const` keyword, JavaScript will not complain.
It will simply consider the variable global.

```js
// Let's declare a global variable
var i = 42;

// And a function that logs each thing in the passed array
function logThings(things) {
  // Oops, we forgot the "var" or "let"
  for (`i = 0`; i < things.length; i++) {
    console.log(things[i]);
  }
}

var fruits = [ 'apple', 'banana', 'pear' ];
logThings();

// Oops, we've modified something outside of the function
console.log(i); // 2
```

Just **don't do it**.

## String syntax

In JavaScript, you have (now) three ways to use strings:

```js
// single-quote: '
var string = 'I\'m your "Wurst" nightmare: ' + worstNightmare;
```
You have to **escape** all other single-quotes, and use `+` to concatenate.

```js
// double-quote: "
var string = "I'm your \"Wurst\" nightmare: " + worstNightmare;
```
You have to escape all other double-quotes, and use `+` to concatenate.

**ES6 only!**

```js
// back-tick (or template literals): `
var string = `I'm your "Wurst" nightmare: ${worstNightmare}`;
```
> To do a back-tick use `Shift + ^`, then hit the `Space` bar.

You don't have to escape anything. To insert variables inside the string, use the `${<variable>}` notation. *Note that using* `+` *still works.*

## JSON

<!-- slide-front-matter class: center, middle -->

### JSON who?

JSON, that stands for **J**ava**S**cript **O**bject **N**otation, is a syntax that is used to **represent JavaScript objects** with **strings**.

JSON can only describe the following types:

| Types   | Notation                |
|:------- | :---------------------- |
| Object  | `{"property": "value"}` |
| Array   | `["value"]`             |
| Number  | `2`                     |
| String  | `"text"`                |
| Null    | `null`                  |
| Boolean | `true`, `false`         |

> Note that **objects' properties** are **double-quoted**.
>
> **It is not possible to describ a JavaScript function in JSON!**

### Example

Here is an example of a **JavaScript object**, and it's **description in JSON**:

<!-- slide-column -->

```js
var starship = {
	designation: "NX-01",
	crew: 83,
	captain: {
		firstname: "Jonathan",
		lastname: "Archer",
		activeService: true
	},
	species: [
		"human",
		"dog",
		"denobulan",
		"vulcan"
	],
	warp: 5,
	cloak: null,
}

```

<!-- slide-column -->

```json
{
	"designation": "NX-01",
	"crew": 83,
	"captain": {
		"firstname": "Jonathan",
		"lastname": "Archer",
		"activeService": true
	},
	"species": [
		"human",
		"dog",
		"denobulan",
		"vulcan"
	],
	"warp": 5,
	"cloak": null,
}
```

> Again, note the `"` around the **object's properties**.

### Using JSON

**Manually** describing a JavaScript object in JSON (or the opposite) can be quite tedious, especially with complicated and intricate objects.

Fortunately, JavaScript provides you with **an utilitary object called `JSON`** that can do that for you.

To transform a **JavaScript object to its JSON description**, use the `JSON.stringify()` method:

```js
var crew = {name: "T'Pol", species: "Vulcan", station: "Science Officer"};
var crewJson = JSON.stringify(crew);
console.log(crewJson);
// Output : "{"name":"T'Pol","species":"Vulcan","station":"Science Officer"}"
```

To do the opposite, that is creating a JavaScript object from a JSON string, use the `JSON.parse()` method:

```js
var crewJson = '{"name": "Travis", "species": "Human", "station": "Helm"}';
var crew = JSON.parse(crewJson);
console.log(crew);
// Output : Object {name: "Travis", species: "Human", station: "Helm"}
```

## TODO

* Constructor functions (syntax with `new`)
* Array operations
* Arrow functions (syntax)

## Resources

* A re-introduction to JavaScript
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript
* Inheritance and the prototype chain
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain
* Introduction to Object-Oriented JavaScript
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
* JavaScript objects in detail
  http://javascriptissexy.com/javascript-objects-in-detail



[babel]: http://babeljs.io
[es]: https://en.wikipedia.org/wiki/ECMAScript
[ex-function-as-argument]: http://codepen.io/AlphaHydrae/pen/dNBpPv?editors=0010
[first-class-functions]: https://en.wikipedia.org/wiki/First-class_function
[js-arrow-functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[js-async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[js-generators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
[js-imports]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
[js-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[js-proxy]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[js-shared-memory]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
[js-typeof-null]: http://www.2ality.com/2013/10/typeof-null.html
[js-symbol]: https://developer.mozilla.org/en-US/docs/Glossary/Symbol
