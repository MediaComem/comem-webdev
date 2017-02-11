# MongoDB

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Document-oriented database](#document-oriented-database)
- [Schema-less collections](#schema-less-collections)
- [Data modeling](#data-modeling)
- [Installation](#installation)
- [Test MongoDB on Linux/OS X](#test-mongodb-on-linuxos-x)
- [Test MongoDB on Windows](#test-mongodb-on-windows)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## What is MongoDB?

<!-- slide-front-matter class: center, middle -->

> "MongoDB is a free and open-source cross-platform **document-oriented database** program."

<p class='center'><img src='images/mongodb.png' width='60%' /></p>



### Key features

* High performance
  * Atomic operations
  * Unacknowledged writes
* **Rich query language**
  * **Data aggregation**
  * Full text search
  * **Geospatial queries**
* High availability
  * Replica sets with automatic failover and data redundancy
* Horizontal scalability
  * Sharding
  * Zones



### Document-oriented database

Instead SQL rows, you store [**JSON-like**][bson] documents in MongoDB:

```json
{
  "_id" : ObjectId("54c955492b7c8eb21818bd09"),
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": ISODate("1970-10-01T00:00:00Z"),
  "interests": [ "Pastry", "Kung fu" ],
  "address" : {
    "city": "Livingston",
    "street" : "13 Garden Street",
    "zip" : "07039"
  },
  "phones": [
    { "type": "professional", "number": "+1-202-555-0144" },
    { "type": "home", "number": "+1-202-555-0186" }
  ]
}
```

* Documents are **key-value** data structures
* Values may include other **documents, arrays, and arrays of documents**



### Schema-less collections

Documents are stored in **collections**.
Unlike SQL tables, collections are **schema-less**.
These two documents could be stored in the same collection:

```json
{
  "_id" : ObjectId("54c955492b7c8eb21818bd09"),
  "name": "John Doe",
  "birthDate": ISODate("1970-10-01T00:00:00Z"),
  "interests": [ "Pastry", "Kung fu" ]
}
```

```json
{
  "_id" : ObjectId("54c955492b7c8eb21818cd1"),
  "model": "Campagna T-Rex",
  "wheels": 3,
  "dimensions": { "length": "3.5m", "width": "1.981m", "height": "1.067m" }
}
```

This example is probably not a good idea, but it also means your documents can **evolve** (add new keys, remove others) without having to migrate your schema.

In MongoDB, documents stored in a collection must have a unique `_id` field that acts as a **primary key**.



## Query language

<!-- slide-front-matter class: center, middle -->

Inserting, querying, updating and removing documents.



### Connecting

Connect to the MongoDB shell.

```bash
$> mongo
MongoDB shell version v3.4.1
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.1
```

You can switch databases with `use <name>`. Let's do that now:

```bash
> use test
switched to db test
```

Note that you do not need to create the "test" database before accessing it.
It is **automatically created** as you first access it.



### Inserting documents

Insert a couple of documents into a collection named **people** (again, it is automtically created if it doesn't exist):

```bash
> db.people.insert({
  "name": "John Doe",
  "birthDate": ISODate("1970-10-01T00:00:00Z"),
  "children": 2,
  "address" : { "city": "Livingston", "street" : "13 Garden Street" },
  "interests": [ "Pastry", "Kung fu" ],
  "phones": []
})
WriteResult({ "nInserted" : 1  })

> db.people.insert({
  "name": "John Smith",
  "birthDate": ISODate("1990-12-24T00:00:00Z"),
  "address" : { "city": "Newport", "street" : "85 Bay Drive" },
  "interests": [ "Sunglasses" ],
  "phones": [
    { "type": "professional", "number": "+1-202-555-0144" },
    { "type": "home", "number": "+1-202-555-0186" }
  ]
})
WriteResult({ "nInserted" : 1  })
```



### Finding documents

Here are a few simple queries you can run with MongoDB's [find][find] method:

```js
// Find all people
db.people.find({})

// Find all people named John Doe
db.people.find({ "name": "John Doe" })

// Find all people living in Newport
db.people.find({ "address.city": "Newport" })

// Find all people that have a home phone number
db.people.find({ "phones.type": "home" })

// Find all people interested in Kung fu
db.people.find({ "interests": "Kung fu"  })

// Find all people named John Smith AND living in Livingston
db.people.find({ "name": "John Smith", "address.city": "Livingston" })
```

#### Query operators

You can write more complex queries with query operators:

```js
// Find all people living in Newport
db.people.find({ "address.city": { "$in": [ "Newport", "Livingston" ] } })

// Find all people born after 1980
db.people.find({ "birthDate": { "$gt": ISODate("1980-01-01")  }  })

// Find all people with no phone numbers
db.people.find({ "phones": { "$size": 0  }  })

// Find all people named John Smith OR living in Livingston
db.people.find({
  $or: [
    { "name": "John Smith" },
    { "address.city": "Livingston" }
  ]
})
```

Read the documention on [query operators][query-operators] to learn more about these and other operators.

#### Projection

You can give a second parameter to `find` to specify which fields to return:


```js
// Find all people and get their name and address only
// ("SELECT name, address FROM people" in SQL)
db.people.find({}, { "name": 1, "address": 1 })

// Find all people named John Doe but without their interests or address
db.people.find({ "name": "John Doe" }, { "address": 0, "interests": 0 })
```

You can specify fields to include or fields to exclude, **not both**.

#### Sort, skip & limit

The `sort` method orders the documents in the result set:

```js
// Find all people sorted by descending name
// ("SELECT * FROM people ORDER BY name DESC" in SQL)
db.people.find({}).sort({ "name": -1 })
```

The `skip` and `limit` methods allow you to select a slice of the result set:

```js
// Find one person
// ("SELECT * FROM people LIMIT 1" in SQL)
db.people.find({}).limit(1)

// Find one person among people sorted by name, starting at the second person
// ("SELECT * FROM people ORDER BY name OFFSET 1 LIMIT 1" in SQL)
db.people.find({}).sort({ "name": 1 }).skip(1).limit(1)
```



### Updating documents

Here's an update example:

```js
// Rename "John Smith" to "John A. Smith" and add "Movies" to his interests
db.people.update(
  { "name": "John Smith" },
  {
    "$set": { "John A. Smith" },
    "$push": { "interests": "Movies" }
  }
)
```

The [update][update] method takes 3 parameters:

* A filter to match the documents to update
* An update document to specify the modification to perform
* An options parameter (optional)

Read the documention on [update operators][update-operators] to learn more about these and other operators.

#### Updating multiple documents

To update multiple documents, you must set the `multi` option to `true`.
Otherwise, only the first matching document will be updated.

```js
// Everyone likes chocolate
db.people.update(
  {},
  {
    "$push": { "interests": "Chocolate" }
  },
  {
    "multi": true
  }
)
```

#### Upserts

The `upsert` option allows you to **automatically insert** a new document when you try to make an **update** but **no matching document is found**:

```js
// Update Ned Stark, but create him if he doesn't exist
db.people.update(
  { "name": "Ned Stark" },
  {
    "$set": {
      "children": 6,
      "interests": [ "Snow" ]
    }
  },
  {
    "upsert": true
  }
)
```

#### Upsert behavior

MongoDB will tell you that an upsert has taken place:

```txt
WriteResult({
  "nMatched" : 0,
  "nUpserted" : 1,
  "nModified" : 0,
  "_id" : ObjectId("589f24f1f0bb4e1d9fedf1eb")
})
```

Note that the query was merged with the update (the new person also has the `name` field):

```js
> db.people.find({ "name": "Ned Stark" })
{
  "_id" : ObjectId("589f24f1f0bb4e1d9fedf1eb"),
  "name" : "Ned Stark",
  "children" : 6,
  "interests" : [ "Snow" ]
}
```

#### Atomic operations

Some operators are **atomic operations**:

```js
// Add one child to John Doe
db.people.update(
  { "name": "John Doe" },
  {
    "$inc": {
      "children": 1
    }
  }
)
```

This means that:

* You can perform some arithmetic operations **directly in the database** without having to first fetch data, then update it
* These operations are not subject to **concurrency issues** (at least on a single node)

#### Replacing documents

**Be careful:** if you do not use update operators, MongoDB will replace the entire document with the second parameter passed to `update`:

```js
> db.people.update({ "name": "Ned Stark"  }, { "children": 5  })

> db.people.find({ "name": "Ned Stark" })

> db.people.find({ "children": 5  })
{ "_id" : ObjectId("589f24f1f0bb4e1d9fedf1eb"), "children" : 5  }
```

As you can see, there is no longer a person named Ned Stark in the collection, because we **replaced that entire document** with one that only has the `children` field.




### Removing documents

You can use [remove][remove] to remove documents from a collection:

```js
// Remove all people
db.people.remove({})

// Remove all people who have 5 children
db.people.remove({ "children": 5 })
```

It removes all matching documents by default.
Set the `justOne` option to `true` if you want to only remove the first matching document:

```js
// Remove the first person found who likes chocolate
db.people.remove({ "interests": "Chocolate" }, { "justOne": true })
```



## Indexes

<!-- slide-front-matter class: center, middle -->

Indexes can support the efficient execution of queries and enforce unicity.



### Creating indexes

Without indexes, MongoDB must perform a **full collection scan** to find the matching documents.
If an appropriate index exists for a query, MongoDB can use the index to **limit the number of documents it must inspect**.

Use [createIndex][create-index] to add an index:

```js
// Add a simple index for queries on the "name" field
> db.people.createIndex( { "name": 1 } )
{
  "createdCollectionAutomatically" : false,
  "numIndexesBefore" : 1,
  "numIndexesAfter" : 2,
  "ok" : 1
}
```



## Data modeling

<!-- slide-front-matter class: center, middle -->

Creating a data model with MongoDB does not have to follow the rules that apply for relational databases. Often, they should not.



### One-to-one relationships

* Consider theses questions: is this a composition relationship (containment)? Is this "aggregate" of documents often used at the same time (i.e. can we reduce chattiness)? Would embedding lead to "a lot" of data duplication?

Normalized data model (references) vs. Embedded data model (sub-documents)

TODO: examples

https://docs.mongodb.com/manual/core/data-modeling-introduction/

https://docs.mongodb.org/getting-started/shell/



## Resources

* [SQL comparison][sql-comparison]



[bson]: https://www.mongodb.com/json-and-bson
[create-index]: https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/
[find]: https://docs.mongodb.com/manual/reference/method/db.collection.find/
[query-operators]: https://docs.mongodb.com/manual/reference/operator/query/
[remove]: https://docs.mongodb.com/manual/reference/method/db.collection.remove/
[sql-comparison]: https://docs.mongodb.com/manual/reference/sql-comparison/
[update]: https://docs.mongodb.com/manual/reference/method/db.collection.update/
[update-operators]: https://docs.mongodb.com/manual/reference/operator/update/
