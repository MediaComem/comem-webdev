# REST conventions

<!-- START doctoc -->
<!-- END doctoc -->



## URL structure

Resources often have relationships:

* **Blog** authors create **posts** that can have **comments**.
* **Courses** are taught by **professors**.

How should we define the URLs to retrieve those resources?



### Nested (or hierarchical) URLs

Suppose I want to get the comments on post 892 of the Comem+ blog.

The URL could represent the hierarchical structure of the resources like this:

```
  http://blog.io/comem-blog/posts/892/comments
```

Or it could be "flat" and have parameters like this:

```
  http://blog.io/comments?blog=comem-blog&postId=892
```

In this case, the **nested** or **hierarchical** version probably makes more sense if you assume that:

* A comment cannot exist outside of a post.
* A post cannot exist outside of a blog.



### Flat URLs

Suppose I want to retrieve the courses given by professor Arnold.

Again, the URL could be nested:

```
http://heig-vd.ch/professors/arnold/courses
```

Or it could be flat:

```
http://heig-vd.ch/courses?professor=arnold
```

In this case, the **flat** version probably makes more sense because:

* The existence of the course does not depend on the existence of the professor.
* If Arnold is murdered, someone else will take over the course.



### Nested vs. flat URLs

There is no *right or wrong* answer.
You will find both styles in popular REST APIs.

When defining URL structures, you should ask yourself:

> Is there an **aggregation** or **composition** relationship between resources?

In this case, it makes sense to use nested or hierarchical URLs.



## Linked resources

Suppose that our REST API handles **companies** and **employees**,
and that it provides the following endpoint:

```http
GET /companies/{id}
```

What company data do you expect to retrieve?



### Embedded resources

```json
{
  "name": "Apple",
  "address" : {},
  "employees" : [
    {
      "firstName" : "Tim",
      "lastName" : "Cook",
      "title" : "CEO"
    },
    {
      "firstName" : "Jony",
      "lastName" : "Ive",
      "title" : "CDO"
    }
  ]
}
```

Reduces "chattiness", often good if there are "few" linked resources; company-employee is not a good example.



### Resource references via IDs

```json
{
  "name": "Apple",
  "address" : {},
  "employeeIds" : [134, 892, 918, 9928]
}
```

The client must know the URL structure to retrieve an an employee.



### Resource references via URLs

```json
{
  "name": "Apple",
  "address" : {},
  "employeeURLs" : [
    "/companies/89/employees/134",
    "/companies/89/employees/892",
    "/companies/89/employees/918",
    "/contractors/255/employees/9928"
  ]
}
```

Good: decouples client and server implementation.



## Resources & actions

Resources like articles, movies or students (i.e. **objects**) are easy to identify and handle with the standard HTTP methods:

| Request               | Purpose                           |
| :---                  | :---                              |
| `GET /students`       | List all students                 |
| `GET /students/42`    | Retrieve student 42's information |
| `POST /students`      | Register a new student            |
| `PUT /students/42`    | Update student 42's information   |
| `DELETE /students/42` | Delete student 42                 |

What if you want to *exclude* a student (i.e. an **action**) from a course because they have cheated?

What HTTP method and URL would you use?



### Action URLs

You could do it like this:

```http
POST /students/42/exclude HTTP/1.1
```

This is considered a **bad practice**:

* "Exclude" is a **verb**, not a **noun**, so it's not a "resource" in the REST sense.
* There is no request body so it's hard to provide additional **data about the action**.



### Actions as a resource

You could consider the "exclusion" to be a resource in itself:

```http
POST /students/42/exclusions HTTP/1.1
Content-Type: application/json

{
  "course": "comem-webdev",
  "date": "2015-10-24",
  "reason": "I don't like you"
}
```

This is more RESTful:

* We have introduced a new resource: an exclusion request.

  > Think about it like the equivalent of a paper form that the professor has to fill out and file.
* This resource can have extra data (e.g. the reason for the exclusion).



## Pagination

What's the problem with this HTTP request?

```http
GET /phone-numbers?city=Tokyo HTTP/1.1
Host: world-phonebook.com
```



## Huge collections

Some collections can grow to a point where it is not possible to get all of its elements in a single HTTP request:

* It would be **too slow**.
* In some cases, the server might not have enough CPU or memory **capacity**.

You want to be able to **successively retrieve chunks** of the collection.

<p class='center'><img src='images/google-pagination.png' /></p>