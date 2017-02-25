# Using Mongoose with Express

Learn how to implement advanced RESTful API operations in [Express][express] with [Mongoose][mongoose] (a [MongoDB][mongodb] Object-Document Mapper).

<!-- slide-include ../../BANNER.md -->

**You will need**

* A running [MongoDB][mongodb] database
* A running [Express][express] application with [Mongoose][mongoose] plugged in

**Recommended reading**

* [RESTful APIs](../rest/)
* [Express](../express/)
* [Mongoose](../mongoose/)



## Demonstration RESTful API

The examples in this tutorial are taken from a RESTful API developed to demonstrate how to implement REST concepts.

You will find the [source code][demo] of this API and its [documentation][demo-doc] on GitHub.
The API is also deployed on [Heroku][heroku] (follow the instructions in the documentation to try it).

You should read about the [resources][demo-res] that you can manipulate with this API before moving on.



## Filtering

<!-- slide-front-matter class: center, middle -->

<p class='center'><img src='images/filtering.png' /></p>

How do I get only the right stuff?



### Limiting collections

Often when clients make requests on a RESTful API's **collection** resource,
they don't need the whole thing; they need **only the items they are interested in** for the current view.

For example, you might want to display:

* The list of movies directed by someone
* The list of movies with a rating greater than or equal to 8
* The list of movies directed by either of your two favorite directors



### Simple filters

Express gives you access to URL query parameters in `req.query`,
and Mongoose offers a chainable **query builder**; they're very easy to plug together:

```js
// GET /api/movies
router.get('/', function(req, res, next) {
  let `query` = Movie.find();

  // Filter movies by director
  if (ObjectId.isValid(req.query.director)) {
    `query = query.where('director').equals(req.query.director)`;
  }
  // Limit movies to only those with a good enough rating
  if (!isNaN(req.query.ratingOver)) {
    `query = query.where('rating').gte(req.query.ratingOver)`;
  }

  // Execute the query
  `query.exec`(function(err, movies) {
    if (err) {
      return next(err);
    }
    res.send(movies);
  });
});
```



### Dynamic filters

What about our director filter?
Can we make it work for **multiple directors** as well?
Yes we can:

```js
// GET /api/movies
router.get('/', function(req, res, next) {
  let `query` = Movie.find();

  // Filter movies by director
  if (Array.isArray(req.query.director)) {
    // Find all movies directed by any of the specified directors
    const directors = req.query.director.filter(ObjectId.isValid);
    `query = query.where('director').in(directors)`;
  } else if (ObjectId.isValid(req.query.director)) {
    // Find all movies directed by a specific person
    `query = query.where('director').equals(req.query.director)`;
  }

  // ...
});
```



## Pagination

<!-- slide-front-matter class: center, middle -->

<p class='center'><img src='images/pagination.png' /></p>

How do I get a reasonable amount of stuff?



### Paginating collections

Some collections are just **too large to send** to the client in their entirety.
The following example will demonstrate how to implement **traditional pagination**
(e.g. like you get at the bottom of the page when doing a search on Google).

To implement pagination:

* The client must tell the server **which elements** of the collection it wants
* The server must give the client enough information to find the **other elements** of the collection



[demo]: https://github.com/MediaComem/comem-webdev-express-rest-demo
[demo-doc]: https://mediacomem.github.io/comem-webdev-express-rest-demo/
[demo-res]: https://github.com/MediaComem/comem-webdev-express-rest-demo#resources
[express]: https://expressjs.com
[heroku]: https://www.heroku.com
[mongodb]: https://www.mongodb.com
[mongoose]: http://mongoosejs.com
