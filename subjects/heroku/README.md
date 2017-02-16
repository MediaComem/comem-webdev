# Heroku

Requirements:

* [Git][git]
* A free [Heroku][heroku] account
* The [Heroku CLI][heroku-cli]
* [Node.js][node] 4+

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What is Heroku?](#what-is-heroku)
  - [Cloud service models](#cloud-service-models)
  - [Infrastructure as a Service (IaaS)](#infrastructure-as-a-service-iaas)
  - [Platform as a Service (PaaS)](#platform-as-a-service-paas)
  - [How does Heroku work?](#how-does-heroku-work)
- [Getting started on Heroku with Node.js](#getting-started-on-heroku-with-nodejs)
  - [Create an express app](#create-an-express-app)
  - [Make it a Git repository](#make-it-a-git-repository)
  - [Create the app on Heroku](#create-the-app-on-heroku)
  - [Deploy it](#deploy-it)
  - [How?](#how)
  - [When do I pay?](#when-do-i-pay)
  - [Databases](#databases)
- [Resources](#resources)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## What is Heroku?

<!-- slide-front-matter class: center, middle, image-header -->

<p class='center'><img src='images/heroku.png' width='50%' /></p>

> Heroku is a cloud **Platform-as-a-Service (PaaS)** supporting several programming languages that is used as a **web application deployment** model.

> Heroku, one of the first cloud platforms, has been in development since June 2007, when it supported only the Ruby programming language, but now supports Java, **Node.js**, Scala, Clojure, Python, PHP, and Go.



### Cloud service models

Cloud-computing providers offer their services according to **different models**, some of which are listed below:

| Service models                      | What they provide         | Examples                                 |
| :---                                | :---                      | :---                                     |
| [Infrastructure as a Service][iaas] | Servers, virtual machines | Amazon EC2, Azure (Microsoft), Rackspace |
| [*Platform as a Service*][paas]     | *Runtime environments*    | Heroku, OpenShift                        |
| [Software as a Service][saas]       | Online services           | Gmail                                    |
| [Functions as a Service][faas]      | Serverless environments   | Amazon Lambda, OpenWhisk (IBM)           |



### Infrastructure as a Service (IaaS)

With traditional cloud providers, you have to **set up, maintain and operate** the **infrastructure** on which your applications are run.

<p class='center'><img src='images/iaas.png' width='70%' /></p>



### Platform as a Service (PaaS)

The goal of PaaS platforms is to get **straight to building applications**.

<img src='images/paas.png' width='50%' />

* Higher-level programming
* Reduced complexity
* Effective deployment with built-in infrastructure
* Easier maintenance
* Scaling



### How does Heroku work?

> Heroku runs your apps inside dynos — smart **containers** on a reliable, fully **managed runtime environment**.

> Developers deploy their **code** written in Node, Ruby, Java, PHP, Python, Go, Scala, or Clojure to a **build system** which produces an app that's ready for execution.

> The **system and language** stacks are **monitored, patched, and upgraded**, so it's always ready and up-to-date.



## Getting started on Heroku with Node.js

<!-- slide-front-matter class: center, middle -->

Deploy an express web app on Heroku



### Create an express app

Install **express-generator** if you haven't already:

```bash
npm install -g express-generator
```

Generate an app:

```bash
$> cd /path/to/projects
$> express heroku-demo
```

Make sure it works:

```bash
$> cd heroku-demo
$> npm install
$> npm start
```

Check that you can access it at [http://localhost:3000](http://localhost:3000).
Once you're sure it works, you can stop it with `Ctrl-C`.



### Make it a Git repository

Code is deployed on Heroku via Git.
Initialize a Git repository in the app's directory:

```bash
$> git init
```

Add a `.gitignore` file to ignore the `node_modules` directory
(dependencies will be installed by Heroku when you push):

```bash
$> echo node_modules > .gitignore
```

Your `.gitignore` file should look like this:

```txt
node_modules
```

Commit all the app's files:

```bash
$> git add --all
$> git commit -m "Initial commit"
```



### Create the app on Heroku

Heroku needs to know about your app:

```bash
$> heroku create
Enter your Heroku credentials.
Email: john.doe@example.com
Password (typing will be hidden):
Logged in as john.doe@example.com
Creating app... done, ⬢ nameless-depths-16198
https://nameless-depths-16198.herokuapp.com/
| https://git.heroku.com/nameless-depths-16198.git
```

Heroku has given a random name to your app.

Also notice that Heroku has added a **remote** named `heroku` to your Git repository:

```bash
$> git remote -v
heroku  https://git.heroku.com/nameless-depths-16198.git (fetch)
heroku  https://git.heroku.com/nameless-depths-16198.git (push)
```

Your app is now ready to deploy!



### Deploy it

Simply push to the new remote.
Notice that **as you push**, Heroku **automatically deploys** your app:

```bash
$> git push heroku master
Counting objects: 18, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (14/14), done.
Writing objects: 100% (18/18), 3.83 KiB | 0 bytes/s, done.
Total 18 (delta 1), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote: -----> `Node.js app detected`
remote: -----> Creating runtime environment
remote: -----> `Building dependencies`
remote:        Installing node modules (package.json)
remote:        heroku-demo@0.0.0 /tmp/build_c9758807eb8979e9eb8af687447e5985
remote:        ├─┬ body-parser@1.16.1
remote: -----> Launching...
remote:        `https://nameless-depths-16198.herokuapp.com/` deployed to Heroku
remote: Verifying deploy... done.
To https://git.heroku.com/nameless-depths-16198.git
 * [new branch]      master -> master
```

Visit the URL Heroku gives you to see your deployed app.



### How?

Heroku bases itself on the **conventions** of the language you're using.

For Node.js, it assumes:

* You are using npm and have a `package.json` file (that's how it **detects** that it's a Node.js app)
* Your dependencies are saved in it (Heroku will run `npm install`)
* You have a `start` script in your `package.json` (Heroku will run `npm start` to run your app)

Similar conventions exist for each language supported by Heroku (e.g. Java, PHP, Ruby).



### When do I pay?

By default, apps are deployed using a **free** Heroku dyno (or process).
Free dynos **sleep after 30 minutes of inactivity**,
or if you have exhausted your [pool of free dyno hours][free-dyno-hours] for the month.

When your app sleeps, it may take **several seconds** (up to a minute) for it start again before it can respond to requests.
It will then work normally until it goes to sleep again after prolonged inactivity.

Free Heroku dynos are suitable for **development** or **experimentation**, but **not for production** apps.

You can of course [pay][pricing] to get production-quality resources.



### Databases

Heroku provides several databases as addons, for example:

* [Heroku Postgres][heroku-postgres] (free version limited to 10,000 rows)
* [mLab MongoDB][mlab-mongodb] (free version limited to 496 MB)
* [Heroku Redis][heroku-redis] (free version limited to 25 MB)

The pricing model is usually similar to Heroku dynos:
there are free versions available that are restricted, but more powerful versions can be purchased.



## Resources

* [Heroku dev center][dev-center]
* [Getting started on Heroku with Node.js][getting-started]



## TODO

* configuration through environment variables



[dev-center]: https://devcenter.heroku.com
[faas]: https://en.wikipedia.org/wiki/Function_as_a_Service
[free-dyno-hours]: https://devcenter.heroku.com/articles/free-dyno-hours
[getting-started]: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction
[git]: https://git-scm.com
[heroku]: https://www.heroku.com/home
[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli
[heroku-postgres]: https://devcenter.heroku.com/articles/heroku-postgresql
[heroku-redis]: https://devcenter.heroku.com/articles/heroku-redis
[iaas]: https://en.wikipedia.org/wiki/Cloud_computing
[mlab-mongodb]: https://devcenter.heroku.com/articles/mongolab
[node]: https://nodejs.org/en/
[paas]: https://en.wikipedia.org/wiki/Platform_as_a_service
[pricing]: https://www.heroku.com/pricing
[saas]: https://en.wikipedia.org/wiki/Software_as_a_service