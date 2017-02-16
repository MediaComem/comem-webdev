# MongoDB aggregations

Requirements:

* [MongoDB][mongodb-site]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Modeling rules](#modeling-rules)
- [One-to-one relationships](#one-to-one-relationships)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Use Case

Suppose we have a MongoDB data model that looks like this...

<p class='center'><img src='images/example-data-model.draw.io.png' /></p>

... and that we want to **retrieve publishers sorted by descending number of books**.

With an SQL database, you would do a **JOIN** between the **Publisher** and the **Book** tables, a **GROUP BY** on the publishers, and a **COUNT** on the books.

But in MongoDB, it's **not possible** to make queries on **two collections at the same time**.

## Aggregation pipeline

We must first query the **Book** collection to find the number of books by publisherId.

And to do that, we must use an [**aggregation operation**][agop].

Aggregations operations...
* ...process data records and return computed results.
* ...group values from multiple documents together, and can perform a variety of operations on the grouped data to return a single result. 

----

MongoDB provides **three ways** to perform aggregation:
* the **aggregation pipeline** 
* the **map-reduce function**
* **single purpose aggregation methods**

> The **aggregation pipeline** is the preferred method in MongoDB (and Mongoose).

### The `aggregate()` function

When using the **aggregation pipeline**, you build a pipeline of **stages**. 

Documents will pass through each stage **in sequence**, and each stage will pass its result to the following stage.

To use the **aggregation pipeline**, one has to call the `aggregate()` function, whose signature is:

```javascript
db.collection.aggregate(pipeline)
```
The `pipeline` argument should be an **array of objects**, each of these objects representing a **stage** in the pipeline.

> See the [documentation][aggregate] for a list of possible stage operators.

### Using the aggregation pipeline

> Remember we want to first query the **books** collection to find the number of books by publisherId ?

For each operations we want to do with our **books**, let's define a **stage** object inside a **pipeline array**, that we will use when calling the `aggregation()` function:

1. Find all the books that have the **format** we want
```javascript
{$match: {format: {$in: formats}}}
```
2. Count the number of book by **publisher**
```javascript
{ $group: {
    	_id: '$publisher', // Group by publisher
    	total: { $sum: 1 } // Count the number of books
}}
```
3. Sort the result from the publisher with the **most books** to the one with the **lower books**
```javascript
{ $group: {
    	_id: '$publisher', // Group by publisher
    	total: { $sum: 1 } // Count the number of books
}}
```
> This stage will output objects with the defined format {_id: "", total: X}

```javascript
Book.aggregate([
	{ $match: { format: { $in: formats } } },
	{ $group: {
		_id: '$publisherId',
		total: { $sum: 1 }
	}},
	{ $sort: { total: -1 } },
	{ $skip: 60 },
	{ $limit: 30 }
], function(err, bookCounts) {
	// ...
});
```

[mongodb-site]: https://www.mongodb.com/
[agop]: https://docs.mongodb.com/manual/aggregation/
[aggregate]: https://docs.mongodb.org/manual/reference/operator/aggregation/