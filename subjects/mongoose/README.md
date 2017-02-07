# Mongoose

Elegant MongoDB object modeling for Node.js.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Object-Document Mapper (ODM) for MongoDB](#object-document-mapper-odm-for-mongodb)
- [Mongoose example](#mongoose-example)
- [Mongoose validations](#mongoose-validations)
- [Mongoose validations](#mongoose-validations-1)
- [Mongoose queries](#mongoose-queries)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Object-Document Mapper (ODM) for MongoDB

“Mongoose provides a straight-forward, schema-based solution to modeling your application data and includes built-in type casting, validation, query building, business logic hooks and more, out of the box.”

* “Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.”
* “Models are fancy constructors compiled from our Schema definitions.”
* “Mongoose documents represent a one-to-one mapping to documents as stored in MongoDB. Each document is an instance of its Model.”

http://mongoosejs.com/docs/guide.html

## Mongoose example

TODO: schema example

* Define a schema
* Create a model to manage documents with that schema and store them in a MongoDB collection

TODO: document example

* Create a document with the model
* Save it

## Mongoose validations

Mongoose has built-in validations, and you can also write your own.

TODO: schema with validations example

* Ensure a property is present with required
* Ensure a number is within bounds with min/max
* Write your own validator function and custom error message

http://mongoosejs.com/docs/validation.html

## Mongoose validations

If your document is invalid, the callback function will be called with an error describing which validations have failed.

TODO: validation error example

http://mongoosejs.com/docs/validation.html

## Mongoose queries

```js
Person
  .find({ occupation: /host/ })
  .where('name.last').equals('Ghost')
  .where('age').gt(17).lt(66)
  .where('likes').in(['vaporizing', 'talking'])
  .limit(10)
  .sort('-occupation')
  .select('name occupation')
  .exec(callback);
```

* You can chain conditions
* Get at most 10 documents
* Retrieve only the fields you are interested in

## Resources

* Quick start guide
  http://mongoosejs.com/docs/index.html
* Queries
  http://mongoosejs.com/docs/queries.html
* Full documentation
  http://mongoosejs.com/docs/guide.html
