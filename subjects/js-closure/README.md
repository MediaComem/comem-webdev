# JS - Closure

<!-- slide-include ../../BANNER.md -->

What's a Closure?

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [THIS!.. IS!.. CLOSURE!](#this-is-closure)
- [This is not...](#this-is-not)
- [Closure in loops](#closure-in-loops)
  - [Wait... what?](#wait-what)
  - [Done right](#done-right)
  - [The revelations](#the-revelations)
- [References](#references)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## THIS!.. IS!.. CLOSURE!

Consider this example:

```javascript
function makeYeller() {
	var city = "Sparta";
*   return function yell() {
*       console.log("This is... " + city);
*   };
};

var Leonidas = makeYeller() // stores a new instance of yell()
Leonidas(); // Execution of the yell() instance print : "This is... Sparta"
```
> `yell()` is a **Closure**: a function that have a reference to a variable declared in an outer scope (in this cas, the `city` variable).

When created, instances of `yell()` will permanently keep the reference to `city`, even after `makeYeller()`'s execution.

Thus, when the instance of `yell()` is executed on the last line, it will check its reference to `city`, and print its last known value, which is `"Sparta"`.

<!-- slide-notes -->

> In this example, `yell()` can access `city`, because both the function and the variable are declared **inside the same scope**, this of `makeYeller()`.

If you were to create another instance of `yell()`, say by adding this code:

```javascript
var Gerard = makeYeller(); // stores a new instance of yell()
```
This new instance would also keep a reference to `city` (and print `"Sparta"` when called), but it would be a different instance of `yell()` than the one stored in the `Leonidas` variable. To be sure of that, do:

```javascript
console.log(Gerard === Leonidas);
// Will print : false
```

## This is not...

For illustration purposes, let's rewrite the previous example like this.

```javascript
function makeYeller() {
	var city = "Sparta";
    return yell;
};

function yell() {
    console.log(city);
};

var Leonidas = yell() // stores the instance of yell()
Leonidas(); // Will raise an ReferenceError
```

The code apparently didn't change that much; all we did was declare `yell()` outside of `makeYeller()`, and yet it's enough to _break all the things_.

`city` is still declared in the scope of `makeYeller()`, but since `yell()` is declared **outside** this scope, it **cannot** access `city` anymore, resulting in a `ReferenceError` when executed.

<!-- slide-notes -->

Moreover, in this case, there is only one instance of `yell()`, that is created when the script is firstly executed.

To test it, let's add the same code as before:

```javascript
var Gerard = makeYeller(); // stores the instance of yell()

console.log(Gerard === Leonidas)
// Will print : true
```
Here, `Leonidas` and `Gerard` store an instance of `yell()`, but its the same instance in both case.

## Closure in loops

Using closures inside a loop can result in a well-know "bug" _(and possibly some frustration, too)_.

Consider the following code:

```javascript
// Returns an array of 10 instances of the rank() function
function createArmy() {
	var generatedSoldiers = [];
	for (var nb = 1; nb < 11; nb++) {
		var rank = function() {
			console.log("I'm the soldier n°" + nb);
		};
		generatedSoldiers.push(rank);
	}
	return generatedSoldiers;
};

var spartan = createArmy();

// Let's execute all the created functions
spartan.forEach(function( soldierFunc ) {
	soldierFunc();
});
```
> What will be the output of this code, once executed?

<!-- slide-notes -->

When we execute all the functions that have been created by the call to `createArmy()`, we could expect the first one to print `"I'm the soldier n°1"`, the second to print `"I'm the soldier n°2"` and so on, until the tenth, that would print `"I'm the soldier n°10"`.

Instead, all the functions will print `"I'm the soldier n°11"`...

### Wait... what?

In the previous example, the function stored in `rank` is a **closure** : it has a reference to a variable declared in an outer scope.

In this case, `rank` has a reference to the `nb` variable (declared by the `for` block).

```javascript
...
*for (var nb = 1; nb < 11; nb++) {
	var rank = function() {
*       console.log("I'm the soldier n°" + nb);
	};
	...
}
...
```
So each of the 10 instances of `rank` will forever keep a **reference** to the **same** `nb` variable... but not to its **value at the time of the instance's creation!**

The value of `nb` will only be used when the `rank()` instances will be executed, that is **after** the `for` loop is finished.

> And at that time, `nb` will have a value of `11`.

### Done right

To solve this problem, we have to find a way to capture, not a reference to `nb`, but its value when each function is created. Here is the correct code: 

```javascript
// Returns an array of 10 instances of the rank() function
function createArmy() {
	var generatedSoldiers = [];
*   function makeRank(nbValue) {
*       return function rank() {
*           console.log("I'm the soldier n°" + nbValue);
*       }
*   }
	for (var nb = 1; nb < 11; nb++) {
*       generatedSoldiers.push(makeRank(nb));
	}
	return generatedSoldiers;
};

var spartan = createArmy();

// Let's execute all the created functions
spartan.forEach(function( soldierFunc ) {
	soldierFunc();
});
```
> `makeRank()` returns a `rank()` function that is **closure**: it references the `nbValue` variable, declared in the signature of `makeRank()`.

### The revelations

The `makeRank()` function is now a **factory**, and returns a new `rank()` function each time it's called.

```javascript
function makeRank(nbValue) {
    return function rank() {
        console.log("I'm the soldier n°" + nbValue);
    }
}
```

The `nbValue` argument is a **local variable** that `rank()` can access.

Each time the `for` loop calls `makeRank()`, the current value of `nb` is passed...

```javascript
for (var nb = 1; nb < 11; nb++) {
*   generatedSoldiers.push(makeRank(nb));
}
```
...this value is copied in a **new** `nbValue` variable, and a **new instance of** `rank()` is returned, that keeps a reference to **this** new `nbValue`.

So, each `rank()` instance keeps a reference to a **different and "personal"** `nbValue` variable, that stores the value `nb` had the moment it was created.

## References

<!-- slide-front-matter class: middle -->

* [MDN - Closures][closure]

[closure]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
