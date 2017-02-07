# REST APIs Introduction

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is a Web Service?](#what-is-a-web-service)
- [Big web services](#big-web-services)
  - [Web services standards overview](#web-services-standards-overview)
  - [Big web services](#big-web-services-1)
- [RESTful web services](#restful-web-services)
  - [Principles of a REST architecture](#principles-of-a-rest-architecture)
  - [References](#references)
  - [HTTP is a protocol for interacting with **resources**](#http-is-a-protocol-for-interacting-with-resources)
  - [What is a resource?](#what-is-a-resource)
  - [Resource vs. representation](#resource-vs-representation)
  - [HTTP provides the **content negotiation** mechanisms](#http-provides-the-content-negotiation-mechanisms)
  - [Languages, platforms, communities](#languages-platforms-communities)
- [Testing tools](#testing-tools)
- [CRUD](#crud)
  - [Create](#create)
  - [Read](#read)
  - [Update](#update)
  - [Delete](#delete)
  - [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is a Web Service?

How do they...
...find each other?
...know what logic can be invoked?
...talk to each other?

Image: clients <-> network <-> server (logic + data)

Remote services (RMI) in Java?

## Big web services

### Web services standards overview

<p class='center'><img src='images/web-services-standards-overview.gif' width='90%' /></p>

### Big web services

Approach
Services are often designed and developed with a RPC style (even if Document-Oriented Services are possible).

Core Standards
Simple Object Access Protocol (SOAP)
Web Services Description Language (WSDL)

Benefits
Very rich protocol stack (support for security, transactions, reliable transfer, etc.)

Problem
Very rich protocol stack (complexity, verbosity, incompatibility issues, theoretical human readability, etc.)

## RESTful web services

* REST: REpresentational State Transfer
* REST is an architectural style for building distributed systems.
* REST has been introduced in Roy Fielding’s Ph.D. thesis (Roy Fielding has been a contributor to the HTTP specification, to the apache server, to the apache community).
* The WWW is one example for a distributed system that exhibits the characteristics of a REST architecture.

## [Hypertext Transfer Protocol (HTTP)][http]

<!-- slide-front-matter class: center, middle -->

> "An [application protocol][application-osi] for distributed, collaborative,
  and [hypermedia][hypermedia] information systems.
  HTTP is the foundation of data communication for the World Wide Web"

### Anatomy of an HTTP request

Get the third page of a movies list:

```http
GET /movies?page=3&pageSize=50 HTTP/1.1
Accept: application/html,*/*
Host: www.example.com
```

Register a new movie:

```http
POST /api/movies HTTP/1.1
Content-Type: application/json
Host: www.example.com

{
  "name": "The Matrix",
  "releaseYear": 1999
}
```

#### Request method

The first line of an HTTP request is the **request line**:

```
 `GET` /movies?page=3&pageSize=50 HTTP/1.1
```

The **request method** is the *desired action* to perform.

| Method | Purpose                               |
| :---   | :---                                  |
| GET    | Retrieve data                         |
| POST   | Create a new resource                 |
| PUT    | Replace an existing resource          |
| PATCH  | Partially modify an existing resource |
| DELETE | Delete a resource                     |

There are [more methods][http-methods].

#### Resource path

The second part of the request line is the **resource path**:

```http
GET `/movies`?page=3&pageSize=50 HTTP/1.1
```

It tells the server where to find the resource to perform the action on.

#### Query string

The **query string** is the third part of the request line:

```http
GET /movies`?page=3&pageSize=50&orderBy=title` HTTP/1.1
```

These are parameters given to the server, usually to *filter* the request.
In this case:

* `page=3` - we want the third page.
* `pageSize=50` - we want pages of 50 movies.
* `orderBy=title` - we want the movies ordered by title.

#### Headers

After the request line, an HTTP request has one or more **headers**:

```http
GET /movies?page=3&pageSize=50 HTTP/1.1
*Accept: application/html,*/*
*Host: www.example.com
```

This allows the client to tell the server how to serve the request:

* `Accept: application/html,*/*` - I prefer HTML, but otherwise give me any format you have.
* `Host: www.example.com` - This is the domain I want the resource from.

There are many [headers][headers] that can be used in requests.

#### Request (or message) body

The **body** is data that the client can ask the server to do something with:

```http
POST /api/movies HTTP/1.1
Content-Type: application/json
Host: www.example.com

*{
*  "name": "The Matrix",
*  "releaseYear": 1999
*}
```

In this case:

* It's a `POST` request, so the server should create a new resource.
* The `Content-Type` header is `application/json`, so the server should interepret the body as a JSON payload.

### Principles of a REST architecture

* The state of the application is captured in a set of resources
  * Users, photos, comments, tags, albums, etc.
* Every resource is identified with a standard format (e.g. URL)
* Every resource can have several representations
* There is one unique interface for interacting with resources (e.g. HTTP methods)

### References

* Very good article, with presentation of key concepts and illustrative examples:
  http://www.infoq.com/articles/rest-introduction
* Suggestions for the design of “pragmatic APIs”
  http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

### HTTP is a protocol for interacting with **resources**

* At first glance, one could think that a resource is a file on a web server:
  * an HTML document, an XML document, a PNG document
* That fits the vision of the “static content” web
* But of course, the web is now more than a huge library of hypermedia documents:
  * through the web, we interact with services and a lot of the content is dynamic.
  * more and more, through the web we interact with physical objects (machines, sensors, actuators)
  * We need a more generic definition for resources!

### What is a resource?

* A resource is "something" that can be named and uniquely identified:
  * Example 1: an article published in the "24 heures" newspaper
  * Example 2: the collection of articles published in the sport section of the newspaper
  * Example 3: a person’s resume
  * Example 4: the current price of the Nestlé stock quote
  * Example 5: the vending machine in the school hallway
  * Example 6: the list of grades of the student Jean Dupont
* URL (Uniform Resource Locator) is a mechanism for identifying resources
  * Example 1: http://www.24heures.ch/vaud/vaud/2008/08/04/trente-etudiants-partent-rencontre-patrons
  * Example 2: http://www.24heures.ch/articles/sport
  * Example 5: http://www.smart-machines.ch/customers/heig/machines/8272

### Resource vs. representation

* A "resource" can be something intangible (stock quote) or tangible (vending machine)
* The HTTP protocol supports the exchange of data between a client and a server.
* Hence, what is exchanged between a client and a server is not the resource. It is a representation of a resource.
* Different representations of the same resource can be generated:
  * HTML representation
  * XML representation
  * PNG representation
  * WAV representation

### HTTP provides the **content negotiation** mechanisms

```http
GET /books HTTP/1.1
Accept: application/json
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  { "title": "Fahrenheit 451" }
]
```

```http
GET /article/game-of-thrones HTTP/1.1
Accept: */*
```

```http
HTTP/1.1 200 OK
Content-Type: text/html

<html>
  <head>
    <title>Game of Thrones</title>
  </head>
  <body>Awesome show!</body>
</html>
```

### Languages, platforms, communities

* Client vs. server...
* Frameworks...
* Full JavaScript...
* Specific tools we will use: node, express, mongodb, mongoose

## Testing tools

TODO: install postman

## CRUD

Create, read, update, delete

### Create

```http
POST /people HTTP/1.1
Content-type: application/json

{
  "name": {
    "first": "John",
    "last": "Doe"
  },
  "age": 24
}
```

```http
HTTP/1.1 201 Created
Content-type: application/json

{
  "_id": "3orv8nrg",
  "name": {
    "first": "John",
    "last": "Doe"
  },
  "age": 24
}
```

The POST method is used to request that the origin server accept the entity enclosed in the request as a new subordinate of the resource identified by the Request URI.

HTTP 201 Created: The request has been fulfilled and resulted in a new resource being created.

### Read

```http
GET /people HTTP/1.1
```

```http
HTTP/1.1 200 OK
Content-type: application/json

[
  { "_id": "3orv8nrg", … },
  { "_id": "a08un2fj", … }
]
```

The GET method means retrieve whatever information (in the form of an entity) is identified by the Request URI.

HTTP 200 OK: Standard response for successful HTTP requests. In a GET request, the response will contain an entity corresponding to the requested resource.

#### Collection resource vs. single resource

```http
GET /people/3orv8nrg HTTP/1.1
```

```http
HTTP/1.1 200 OK
Content-type: application/json

{
  "_id": "3orv8nrg",
  "name": {
    "first": "John",
    "last": "Doe"
  },
  "age": 24
}
```

### Update

```http
PUT /people/3orv8nrg HTTP/1.1
Content-type: application/json

{
  "name": {
    "first": "John",
    "last": "Smith"
  },
  "age": 34
}
```

```http
HTTP/1.1 200 OK
Content-type: application/json

{
  "_id": "3orv8nrg",
  "name": {
    "first": "John",
    "last": "Smith"
  },
  "age": 34
}
```

The PUT method requests that the enclosed entity be stored under the supplied Request URI. If the Request URI refers to an already existing resource, the enclosed entity SHOULD be considered as a modified version of the one residing on the origin server.

HTTP 200 OK: In a PUT request, the response will contain an entity describing or containing the result of the action.

#### Partial updates with PATCH

TODO: partial update with PATCH example

### Delete

```http
DELETE /people/3orv8nrg HTTP/1.1
```

```http
HTTP/1.1 204 No Content
Content-type: application/json
```

The DELETE method requests that the origin server delete the resource identified by the Request URI.

HTTP 204 No Content: The server successfully processed the request, but is not returning any content.

### Resources

TODO: HTTP request methods link

TODO: HTTP status codes link



[http]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[application-osi]: https://en.wikipedia.org/wiki/Application_layer
[hypermedia]: https://en.wikipedia.org/wiki/Hypermedia
[http-methods]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
[headers]: https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields
