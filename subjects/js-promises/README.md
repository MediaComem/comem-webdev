# JavaScript Promises

Learn to use promises for asynchronous computation.

**Recommended reading**

* [JavaScript](../js/)
* [JavaScript Closures](../js-closures/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is a promise?](#what-is-a-promise)
  - [Promises/A+ specification](#promisesa-specification)
  - [English, please?](#english-please)
  - [Code, please?](#code-please)
  - [Consuming a promise](#consuming-a-promise)
- [Chaining promises](#chaining-promises)
  - [Resolving promises in chains](#resolving-promises-in-chains)
  - [Rejecting promises in chains](#rejecting-promises-in-chains)
  - [Using `catch()`](#using-catch)
  - [Behavior of a promise chain](#behavior-of-a-promise-chain)
- [Resources](#resources)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## What is a promise?

<!-- slide-front-matter class: center, middle -->

<img src='images/promises-logo.png' />

> "A promise represents the **eventual result of an asynchronous operation**.
> It is a placeholder into which the **successful result value or reason for failure** will materialize."



### Promises/A+ specification

All promises follow the [Promises/A+ specification](promises-spec).
Basically, a promise is an object with a `then()` function that has the following signature:

```js
promise.then(onResolved, onRejected)
```

It takes **2 callback functions**:

* The **first** one is called if the asynchronous operation was **successful**
* The **second** one is called if the asynchronous operation **failed**



### English, please?

<!-- slide-column -->

Imagine you are a **kid**.
Your mom **promises** you that she'll get you a **new phone next week**.

You don't **know** if you will get that phone **until next week**.
Your mom can either **really buy** you a brand new phone, or **stand you up** and withhold the phone if she is not happy.

<!-- slide-column 30 -->

<img src='images/phone-gift.png' class='w70' />

<!-- slide-container -->

That's a promise.
A promise has 3 states; it can be:

* **Pending:** you don't know if you will get that phone until next week
* **Resolved:** your mom really does buy you a brand new phone
* **Rejected:** you don't get a new phone because your mom is not happy



### Code, please?

Here's the same scenario in JavaScript:

```js
// Mom might be happy (or not)
var isMomHappy = Math.random() < 0.5;

// Make a promise
var phonePromise = `new Promise(function(resolve, reject) {`

  var oneWeek = 1000 * 60 * 60 * 24 * 7;

  // In one week...
  setTimeout(function() {
    if (`isMomHappy`) {
      var phone = {
        brand: 'Samsung',
        color: 'black'
      };
*     resolve(phone); // Resolve the promise (if mom is happy)
    } else {
      var reason = new Error('mom is very disappointed');
*     reject(reason); // Reject the promise (if mom is not happy)
    }
  }, oneWeek);
`})`;
```



### Consuming a promise

As we've seen from the specification,
simply call a promise's `then()` method to be notified when it is resolved or rejected:

```js
function onResolved(phone) {
  console.log("I got a new phone! It's a " + phone.brand);
}

function onRejected(reason) {
  console.log("I didn't get a phone because " + reason);
}

phonePromise.then(onResolved, onRejected);
```

* If a promise is **resolved**, the **first callback** will be called with the **resolved value** (the one passed to `resolve()` in the promise function)
* If a promise is **rejected**, the **second callback** will be called with the **rejection reason** (the one passed to `reject()` in the promise function)

#### Let's try it

You could test this code with an interval to see that the promise is really **pending** until it is either **resolved or rejected**:

```js
var interval = setInterval(function() {
  console.log("I still don't know if I'll get it...");
}, 1000);

function onResolved(phone) {
  console.log("I got a new phone! It's a " + phone.brand);
  clearInterval(interval);
}

function onRejected(reason) {
  console.log("I didn't get a phone because " + reason);
  clearInterval(interval);
}

phonePromise.then(onResolved, onRejected);
```

[See it in action here.][promises-codepen]



## Chaining promises

Promises are chainable.
The `then()` function also **returns a promise**: a promise that **will be resolved or rejected when the original one is**.

Let's say, you, the kid, **promise** your friend that you will **show them the new phone** when your mom buy you one.
That's another promise.
Let's write it!

```js
function showOff(phone) {
  return new Promise(function(`resolve`, reject) {
    var message = 'Hey friend, I have a new ' +
        phone.color + ' ' + phone.brand + ' phone';

    `resolve`(message);
  });
}
```

Chaining this promise together with the phone promise is as simple as:

```js
function onResolved(result) {
  console.log(result);
}

phonePromise`.then(showOff)`.then(onResolved, onRejected);
```

#### Not calling `reject`

Note that we **didn't call reject** in that second promise:

```js
function showOff(phone) {
  return new Promise(function(`resolve`, reject) {
    var message = 'Hey friend, I have a new ' +
        phone.color + ' ' + phone.brand + ' phone';

    `resolve`(message);
  });
}
```

You **don't have to call both** `resolve()` and `reject()`.
Sometimes, you know things will never fail (like you showing off your new phone to your friend).



### Resolving promises in chains

<!-- slide-column -->

That second promise we wrote looks a bit complicated.
All we're doing is resolving it with a message.

<!-- slide-column 65 -->

```js
function showOff(phone) {
  return new Promise(function(`resolve`, reject) {
    var message = 'Hey friend...';
    `resolve`(message);
  });
}
```

<!-- slide-container -->

<!-- slide-column -->

You can use the `Promise.resolve` shortcut instead.
It will create a promise that is automatically resolved with the passed value.

<!-- slide-column 65 -->

```js
function showOff(phone) {
  var message = 'Hey friend...';
  return `Promise.resolve`(message);
}
```

<!-- slide-container -->

<!-- slide-column -->

Actually, a promise chain will even do that for you **automatically**.

<!-- slide-column 65 -->

```js
function showOff(phone) {
  return 'Hey friend...';
}
```

<!-- slide-container -->

In this promise chain, the 3 `showOff()` functions above are **strictly equivalent**:

```js
phonePromise.then(showOff).then(onResolved, onRejected);
```



### Rejecting promises in chains

<!-- slide-column -->

You could also **always reject** the promise.
Maybe you broke your leg and can't show off.

<!-- slide-column 65 -->

```js
function showOff(phone) {
  return new Promise(function(resolve, `reject`) {
    var reason = new Error('I broke my leg');
    `reject`(reason);
  });
}
```

<!-- slide-container -->

<!-- slide-column -->

You can also use the `Promise.reject` shortcut.

<!-- slide-column 65 -->

```js
function showOff(phone) {
  var reason = new Error('I broke my leg');
  return `Promise.resolve`(message);
}
```

<!-- slide-container -->

<!-- slide-column -->

A third way is to simply **throw an error**.
That will **automatically reject the promise**.

<!-- slide-column 65 -->

```js
function showOff(phone) {
  throw new Error('I broke my leg');
}
```

<!-- slide-container -->

In this promise chain, the 3 `showOff()` functions above are **strictly equivalent**:

```js
phonePromise.then(showOff).then(onResolved, onRejected);
```



### Using `catch()`

The `catch()` function is simply a shortcut to plug a **rejection callback** into a promise chain:

```js
phonePromise.then(showOff).then(onResolved)`.catch(onRejected)`;
```

It's equivalent to:

```js
phonePromise.then(showOff).then(onResolved, onRejected);
```

Or to:

```js
phonePromise.then(showOff).then(onResolved).then(undefined, onRejected);
```

But it's easier to read and is similar in behavior to `try/catch`.



### Behavior of a promise chain

We've seen that `then()` returns a promise, which is resolved or rejected when the original promise is.

* What happens if you get the phone and successfully show off to your friend?
* What happens if you get the phone but break your leg and can't show off?
* What happens if you don't get the phone?

```js
phonePromise.then(showOff).then(onResolved).catch(onRejected);
```

**What functions are called** in these 3 cases?

#### All's right with the world

Assuming **mom is happy**,
and you didn't break your leg and **successfully showed off** to your friend,
this is what will happen:

<p class='center'><img src='images/promise-chain-1.png' class='w80' /></p>

Both `showOff()` and `onResolved()` will be called,
because **each promise** in the chain **is resolved**,
so the **first callback** of the two `then()` calls are executed.

`onRejected()` is **not called**.

Remember, `catch()` is equivalent to this:

```js
phonePromise.then(`showOff`).then(`onResolved`, onRejected);
```

Since everything is resolved, only the **first callback** of each `then()` call is executed.

#### Catching errors in a promise chain

What happens if **mom is happy** and gives you the phone,
but you break your leg and **can't show off** to your friend?

<p class='center'><img src='images/promise-chain-2.png' class='w80' /></p>

In this case, `showOff()` is called because `phonePromise` was **resolved**,
but `onResolved()` is **not called**.

`showOff()` was rejected, so the promise returned by `then(showOff)` is rejected as well,
therefore `onResolved()` will not be called.

Instead, the **second callback**, or **the next `catch()`** will be called,
therefore `onRejected()` is called:

```js
phonePromise.then(`showOff`).then(onResolved, `onRejected`);
phonePromise.then(`showOff`).then(onResolved).catch(`onRejected`);
```

#### Early errors in a promise chain

What happens if **you don't get the phone**?

<p class='center'><img src='images/promise-chain-3.png' class='w80' /></p>

In this case, `phonePromise` is **rejected**, so `showOff()` will **not be called**,
and the promise returned by `then(showOff)` will **also be rejected**, so `onResolved()` will not be called.

This time, only `onRejected()` is called:

```js
phonePromise.then(showOff).then(onResolved, `onRejected`);
phonePromise.then(showOff).then(onResolved).catch(`onRejected`);
```





## Resources

* [Promises/A+ specification][promises-spec]

**Further reading**

* [JavaScript Promises for Dummies][javascript-promises-for-dummies]
* [JavaScript Promises: an Introduction][javascript-promises-an-introduction]
* [Promises][mdn-promises]



## TODO

* handling errors in rejection callbacks
* asynchronous
* all
* https://developers.google.com/web/fundamentals/getting-started/primers/promises



[javascript-promises-an-introduction]: https://developers.google.com/web/fundamentals/getting-started/primers/promises
[javascript-promises-for-dummies]: https://scotch.io/tutorials/javascript-promises-for-dummies
[mdn-promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[promises-codepen]: http://codepen.io/AlphaHydrae/pen/PpJNXb?editors=1010
[promises-spec]: https://promisesaplus.com
