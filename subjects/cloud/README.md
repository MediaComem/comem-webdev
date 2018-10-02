# Cloud Computing

Learn what cloud computing is and about the common service models available today.

<!-- slide-include ../../BANNER.md -->





## Client-server model

The [client-server model][client-server-model] is one of the main ways distributed and networked computer systems are organized today.
In this model, **servers** share their resources with **clients**, who **request a server's content or services**.

<p class='center'><img class='w65' src='images/client-server.jpg' /></p>

> The communication is not only one way.
> In modern web applications, servers may also **push data to their clients**.

### Types of servers

A server can provide many different kinds of content or services:

* A [**file server**][file-server] provides shared disk access accessible over the network,
  to store files such as text, image, sound or video.
* A [**database server**][db-server] houses an application that provides database services to other computer programs.
* A [**web server**][web-server] can serve contents over the Internet.
* An [**application server**][app-server] provides an environment to run web applications.

<p class='center'>
  <img height='150px' src='images/file-server.png' />
  <img height='150px' src='images/db-server.png' />
  <img height='150px' src='images/web-server.png' />
  <img height='150px' src='images/app-server.png' />
</p>

These are just a few examples.
There are many [types of servers][server-types] depending on the scenario and the resources you want to provide.

### [Internet hosting][internet-hosting]

Not every individual and organization has access to vast computer resources.
Some companies provide Internet servers that can be owned or leased by clients.

One common example is [web hosting][web-hosting],
where server space is provided to make websites accessible over the Internet.

<!-- slide-column -->

[**Managed/shared hosting**][shared-hosting]

Multiple websites (from a few to a few hundred) are placed on the same server and **share a common pool of resources** (e.g. CPU, RAM).
This is the simplest but least performant model.

<!-- slide-column -->

[**Virtual hosting**][virtual-hosting]

Using [virtualization][virtualization], physical server resources can be divided into **virtual servers**.
Customers may have root access to their own virtual space.

<!-- slide-column -->

[**Dedicated hosting**][dedicated-hosting]

Customers get their own **physical server(s)** and gain full control over it.
They are responsible for the security and maintenance of the servers.


### Cloud computing

<!-- slide-column -->

[Cloud computing][cloud] is nothing new.
It's simply a **pool of configurable computer system resources**.

These resources may be **servers**,
or **infrastructure** for those servers (e.g. network, storage),
or **applications** running on those servers (e.g. web applications).

<!-- slide-column 70 -->

<p class='center'><img class='w100' src='images/cloud.png' /></p>

### Why use cloud computing?

Cloud computing resources can be **rapidly provisioned** with **minimal management** effort, allowing great **economies of scale**.

Companies using cloud computing can **focus on their core business** instead of expending resources on computer infrastructure and maintenance.

<!-- slide-column -->

**Advantages**

Pay-as-you-go models **minimize up-front computer infrastructure costs**.

Allows to more rapidly **adjust to fluctuating and unpredictable computing demands**.

<!-- slide-column -->

**Disadvantages**

**Limited customization** options (since you do not have complete control over the infrastructure).

**Security and privacy** can be a concern depending on a business's legal requirements.



## Deployment models

<!-- slide-column -->

**Private cloud**

Cloud infrastructure operated solely **for a single organization**,
managed and hosted internally or by a third party.

These clouds are very capital-intensive (they require physical space, hardware, etc).

**Providers:** Microsoft, IBM, Dell, VMWare, HP, Cisco, Red Hat.

<!-- slide-column -->

**Public cloud**

Cloud services **open for public use**, provided over the Internet.

There is little to no technical difference between private and public clouds,
but security considerations might differ.

**Platforms:** [Amazon Web Services][aws], [Google Cloud Platform][google-cloud], [Microsoft Azure][azure].

<!-- slide-column -->

**Hybrid cloud**

Composition of two or more clouds bound together to benefit from the advantages of multiple deployment models.

For example, a platform may store sensitive data on a private cloud, but connect to other applications on a public cloud for greater flexibility.

<!-- slide-container -->

There also are a few [other deployment models][other-deployment-models],
for example **distributed clouds** where computing power can be provided by volunteers donating the idle processing resources of their computers.

### Public clouds

Most public **cloud computing providers** such as Amazon, Google and Microsoft **own and operate the infrastructure** at their data center,
and **provide cloud resources via the Internet**.

For example, the Amazon Web Services cloud was [initially developed internally][aws-history] to support Amazon's retail trade.
As their computing needs grew, they felt the need to build a computing infrastructure that was **completely standardized and automated**,
and that would **rely extensively on web services** for storage and other computing needs.

As that infrastructure grew, Amazon started **selling access to some of their services**,
initially virtual servers, as well as a storage and a message queuing service.
Today Amazon is one of the largest and most popular cloud services provider.



## Service models

Cloud computing providers offer their services according to different models.

Model                                | Acronym     | What is provided                                                    | Example
:---                                 | :---        | :---                                                                | :---
[Infrastructure as a Service][iaas]  | **`IaaS`**  | Virtual machines, servers, storage, load balancers, network, etc.   | [Amazon Web Services][aws], [Google Cloud][google-cloud], [Microsoft Azure][azure]
[Platform as a Service][paas]        | **`PaaS`**  | Execution runtime, database, web server, development tools, etc.    | [Cloud Foundry][cloud-foundry], [Heroku][heroku], [OpenShift][openshift]
[Function as a Service][faas]        | **`FaaS`**  | Event-based hosting of individual functions.                        | [AWS Lambda][aws-lambda], [Azure Functions][azure-functions], [Cloud Functions][cloud-functions]
[Software as a Service][saas]        | **`SaaS`**  | Web applications such as CRM, email, games, etc.                    | [Dropbox][dropbox], [Gmail][gmail], [Slack][slack]
[Mobile Backend as a Service][mbaas] | **`MBaaS`** | Cloud storage, computing services and APIs for mobile applications. | [CloudBoost][cloudboost], [Firebase][firebase]





## TODO

* Public cloud: security and privacy
* Service models: increasing abstraction & serverless computing
* IaaS
  * CaaS
* PaaS, SaaS, MBaaS, FaaS
* Serverless computing





[app-server]: https://en.wikipedia.org/wiki/Application_server
[aws]: https://aws.amazon.com/
[aws-history]: https://en.wikipedia.org/wiki/Amazon_Web_Services#History
[aws-lambda]: https://aws.amazon.com/lambda/
[azure]: https://azure.microsoft.com/
[azure-functions]: https://azure.microsoft.com/en-us/services/functions/
[client-server-model]: https://en.wikipedia.org/wiki/Client%E2%80%93server_model
[cloud]: https://en.wikipedia.org/wiki/Cloud_computing
[cloudboost]: https://www.cloudboost.io/
[cloud-foundry]: https://www.cloudfoundry.org/
[cloud-functions]: https://cloud.google.com/functions/
[db-server]: https://en.wikipedia.org/wiki/Database_server
[dedicated-hosting]: https://en.wikipedia.org/wiki/Dedicated_hosting_service
[dropbox]: https://www.dropbox.com/
[faas]: https://en.wikipedia.org/wiki/Function_as_a_service
[file-server]: https://en.wikipedia.org/wiki/File_server
[firebase]: https://firebase.google.com/
[gmail]: https://www.google.com/gmail/
[google-cloud]: https://cloud.google.com/
[heroku]: https://www.heroku.com/
[iaas]: https://en.wikipedia.org/wiki/Infrastructure_as_a_service
[internet-hosting]: https://en.wikipedia.org/wiki/Internet_hosting_service
[mbaas]: https://en.wikipedia.org/wiki/Mobile_backend_as_a_service
[openshift]: https://www.openshift.com/
[other-deployment-models]: https://en.wikipedia.org/wiki/Cloud_computing#Others
[paas]: https://en.wikipedia.org/wiki/Platform_as_a_service
[saas]: https://en.wikipedia.org/wiki/Software_as_a_service
[server-types]: https://en.wikipedia.org/wiki/Server_(computing)#Purpose
[shared-hosting]: https://en.wikipedia.org/wiki/Shared_web_hosting_service
[slack]: https://slack.com/
[virtual-hosting]: https://en.wikipedia.org/wiki/Virtual_private_server
[virtualization]: https://en.wikipedia.org/wiki/Virtualization
[web-hosting]: https://en.wikipedia.org/wiki/Web_hosting_service
[web-server]: https://en.wikipedia.org/wiki/Web_server
