# Installing MongoDB

Learn how to install [MongoDB][mongodb] **Community Edition** on macOS or Windows.
You will find detailed installation instructions for all platforms [in the documentation][installation-instructions].

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installing MongoDB](#installing-mongodb)
  - [Test MongoDB on Linux/OS X](#test-mongodb-on-linuxos-x)
  - [Test MongoDB on Windows](#test-mongodb-on-windows)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## MongoDB on macOS

Run the following commands to download and uncompress the binary distribution of MongoDB **in the current working directory of your CLI**:

```bash
$> pwd
/Users/jdoe/Downloads

$> curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.2.tgz

$> tar -zxvf mongodb-osx-x86_64-3.4.2.tgz

$> ls mongodb-osx-x86_64-3.4.2
GNU-AGPL-3.0   MPL-2   README   THIRD-PARTY-NOTICES   bin
```

Move and/or rename the `mongodb-osx-x86_64-3.4.2` directory where you want it (you can do that in the CLI or manually in your Finder/Desktop).

For example, you could move it to your home directory (**_only if_ your username doesn't have any spaces/accents**, otherwise move it somewhere else):

```bash
$> mv mongodb-osx-x86_64-3.4.2 ~/mongodb
```



### Create the MongoDB data directory on macOS

You need to create a directory for the MongoDB server to store its databases in (it looks in `/data/db` by default).
Run the following commands to **create the data directory** and **give ownership of it to your user**:

```bash
$> sudo mkdir -p /data/db
$> sudo chown "$(whoami)" /data/db
```

*(**Note:** you will need to enter your password.)*



### Run the MongoDB server on macOS

To run the MongoDB server, you will need to launch the `mongod` executable.
(The `d` in `mongod` means [daemon][daemon]: a program that runs as a background process and is not interactive).
There are **three ways** you can run MongoDB, assuming you have it at `~/mongodb` (adapt the instructions otherwise):

1. Go in `~/mongodb/bin` and run `./mongod`:

  ```bash
  $> cd ~/mongodb/bin
  $> ./mongod
  ```

2. Run `mongod` by its **absolute path** (from anywhere):

  ```bash
  $> /Users/jdoe/mongodb/bin/mongod
  ```

3. Add the line `export PATH=~/mongodb/bin:$PATH` to your `.bash_profile` and re-launch your CLI so you can run it by simply typing `mongod`:

   ```bash
   $> mongod
   ```

   (Re-read [The `PATH` variable](..//cli/#30) if you need to refresh your memory.)

#### What you should see

When you run `mongod`, it should take over the CLI and show you the MongoDB server logs:

```bash
$> mongod
2017-02-27T10:02 I CONTROL  [init...] MongoDB starting :
2017-02-27T10:02 I CONTROL  [init...]   pid=3039 port=27017 dbpath=/data/db ...
2017-02-27T10:02 I CONTROL  [init...] db version v3.4.2
2017-02-27T10:02 I CONTROL  [init...] ...
2017-02-27T10:02 I CONTROL  [init...]
2017-02-27T10:02 I CONTROL  [init...] ** WARNING: Access control is not enabled
2017-02-27T10:02 I CONTROL  [init...] **          for the database. Read and
2017-02-27T10:02 I CONTROL  [init...] **          write access to data and
2017-02-27T10:02 I CONTROL  [init...] **          configuration is unrestricted.
2017-02-27T10:02 I CONTROL  [init...]
2017-02-27T10:02 I CONTROL  [init...] ...
2017-02-27T10:02 I CONTROL  [init...]
2017-02-27T10:02 I NETWORK  [thread1] `waiting for connections on port 27017`
```

You will know it's working if it says that it's **waiting for connections on port 27017** (the default port for MongoDB).
You now have a running MongoDB server that **will accept connections from clients**.



### Run the MongoDB shell on macOS

You will use the MongoDB shell as a client.
**Open another CLI** (you need to keep the MongoDB server running in the other one).

You run the MongoDB shell by launching the `mongo` executable.
Use the same **three ways** of launching it as for `mongod`, but type `mongo` instead:

```bash
$> mongo
MongoDB shell version: 3.4.1
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.2
*>
```

You will know it's working if you see a **different prompt** in your CLI.
That means you are now connected to the MongoDB shell and can **type MongoDB commands**.



## MongoDB on Windows

Download and install [MongoDB Community Edition][mongodb-download].

You need to create a directory for the MongoDB server to store its databases in (it looks in `C:\data\db` by default).

For MongoDB on Windows, you **MUST use the Windows command line** (not a Unix shell like Git Bash), otherwise you will have problems.
Open the **Launch menu** and type `cmd` to launch it.

Run the following command in the Windows CLI to **create the data directory**:

```bash
$> md \data\db
```

MongoDB looks for a /data/db directory by default. You can create it in Babun with the following command:

```bash
$> mkdir -p /c/data/db
```



### Run the MongoDB server on Windows

To run the MongoDB server, you will need to launch the `mongod` executable.
(The `d` in `mongod` means [daemon][daemon]: a program that runs as a background process and is not interactive).

You need to type the **double-quoted, absolute path** to `mongod.exe` (adapt the path if your MongoDB installation is elsewhere):

```bash
$> "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"

2016-02-22T07:25 I CONTROL  [init...] MongoDB starting :
2016-02-22T07:25 I CONTROL  [init...]   pid=203 port=27017 dbpath=\data\db ...
2016-02-22T07:25 I CONTROL  [init...] db version v3.4.2
2016-02-22T07:25 I CONTROL  [init...] ...
2016-02-22T07:25 I NETWORK  [init...] `waiting for connections on port 27017`
```

You will know it's working if it says that it's **waiting for connections on port 27017** (the default port for MongoDB).
You now have a running MongoDB server that **will accept connections from clients**.



### Run the MongoDB shell on Windows

You will use the MongoDB shell as a client.
**Open another Windows cmd** (you need to keep the MongoDB server running in the other one).

You run the MongoDB shell by launching the `mongo.exe` executable.
Again, you must use the **double-quoted, absolute path**:

```bash
$> "C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe"
MongoDB shell version: 3.4.2
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.2
*>
```

You will know it's working if you see a **different prompt** in your CLI.
That means you are now connected to the MongoDB shell and can **type MongoDB commands**.



## Test the MongoDB shell on macOS or Windows

Once you have:

* A **running MongoDB server** in a CLI
* An **open MongoDB shell**

Make sure it works by trying a few commands:

```bash
> use test
connecting to: test
> db.things.insert({ "fruit": "apple" })
WriteResult({ "nInserted" : 1 })
> db.things.insert({ "name": "John Doe", "age": 24 })
WriteResult({ "nInserted" : 1 })
> db.things.find()
{ "_id" : ObjectId("56ca09b5d536b4526d219ba8"), "fruit" : "apple" }
{ "_id" : ObjectId("56ca095ed536b4526d219ba7"), "name" : "John Doe", "age" : 24 }
```



## Troubleshooting

<!-- slide-front-matter class: center, middle -->



### There's an error when I try to launch the MongoDB server

<!-- slide-front-matter class: center, middle -->



#### Data directory not found

If you see an error like this:

```bash
mongod
2017-02-27T10:00 I CONTROL  [initandlisten] MongoDB starting : pid=2975 port=27017 dbpath=/data/db 64-bit host=haven.einet.ad.eivd.ch
2017-02-27T10:00 I CONTROL  [initandlisten] db version v3.4.2
2017-02-27T10:00 I CONTROL  [initandlisten] git version: 3f76e40c105fc223b3e5aac3e20dcd026b83b38b
2017-02-27T10:00 I CONTROL  [initandlisten] allocator: system
2017-02-27T10:00 I CONTROL  [initandlisten] modules: none
2017-02-27T10:00 I CONTROL  [initandlisten] build environment:
2017-02-27T10:00 I CONTROL  [initandlisten]     distarch: x86_64
2017-02-27T10:00 I CONTROL  [initandlisten]     target_arch: x86_64
2017-02-27T10:00 I CONTROL  [initandlisten] options: {}
2017-02-27T10:00 I STORAGE  [initandlisten] exception in initAndListen: 29 Data directory /data/db not found., terminating
2017-02-27T10:00 I NETWORK  [initandlisten] shutdown: going to close listening sockets...
2017-02-27T10:00 I NETWORK  [initandlisten] shutdown: going to flush diaglog...
2017-02-27T10:00 I CONTROL  [initandlisten] now exiting
2017-02-27T10:00 I CONTROL  [initandlisten] shutting down with code:100
```

It means that you have **not created MongoDB's data directory**, which by 

#### Attempted to create a lock file on a read-only directory

If you see an error like this:

```bash
2017-02-27T10:01:55.449+0100 I CONTROL  [initandlisten] MongoDB starting : pid=3017 port=27017 dbpath=/data/db 64-bit host=haven.einet.ad.eivd.ch
2017-02-27T10:01:55.449+0100 I CONTROL  [initandlisten] db version v3.4.2
2017-02-27T10:01:55.449+0100 I CONTROL  [initandlisten] git version: 3f76e40c105fc223b3e5aac3e20dcd026b83b38b
2017-02-27T10:01:55.449+0100 I CONTROL  [initandlisten] allocator: system
2017-02-27T10:01:55.449+0100 I CONTROL  [initandlisten] modules: none
2017-02-27T10:01:55.449+0100 I CONTROL  [initandlisten] build environment:
2017-02-27T10:01:55.449+0100 I CONTROL  [initandlisten]     distarch: x86_64
2017-02-27T10:01:55.449+0100 I CONTROL  [initandlisten]     target_arch: x86_64
2017-02-27T10:01:55.449+0100 I CONTROL  [initandlisten] options: {}
2017-02-27T10:01:55.450+0100 I STORAGE  [initandlisten] exception in initAndListen: 20 Attempted to create a lock file on a read-only directory: /data/db, terminating
2017-02-27T10:01:55.450+0100 I NETWORK  [initandlisten] shutdown: going to close listening sockets...
2017-02-27T10:01:55.450+0100 I NETWORK  [initandlisten] shutdown: going to flush diaglog...
2017-02-27T10:01:55.450+0100 I CONTROL  [initandlisten] now exiting
2017-02-27T10:01:55.450+0100 I CONTROL  [initandlisten] shutting down with code:100
```



### There's warning when I launch the MongoDB server or open the MongoDB shell

If you see this warning either when running `mongod` or `mongo`:

```bash
2017-02-27T10:02 I CONTROL  [init...] ** WARNING: Access control is not enabled
2017-02-27T10:02 I CONTROL  [init...] **          for the database. Read and
2017-02-27T10:02 I CONTROL  [init...] **          write access to data and
2017-02-27T10:02 I CONTROL  [init...] **          configuration is unrestricted.
```

It's because MongoDB tells you that access to your databases is unrestricted as there is **no username/password** configured by default.

This is a bad thing in production, but it acceptable during development when you are running the database on your local machine and external access is probably blocked by your firewall anyway.
So you can **ignore** this warning **as long as you're only running MongoDB for development**.



### There's an error when I try to open the MongoDB shell

If you see an error like this:

```bash
$> mongo
MongoDB shell version v3.4.1
connecting to: mongodb://127.0.0.1:27017
2017-02-27T09:51+0100 W NETWORK  [main] Failed to connect to 127.0.0.1:27017,
2017-02-27T09:51+0100 W NETWORK    in(checking socket for error after poll),
2017-02-27T09:51+0100 W NETWORK    reason: Connection refused
2017-02-27T09:51+0100 E QUERY    [main] Error:
2017-02-27T09:51+0100 E QUERY      couldn't connect to server 127.0.0.1:27017,
2017-02-27T09:51+0100 E QUERY      connection attempt failed :
connect@src/mongo/shell/mongo.js:234:13
@(connect):1:6
exception: connect failed
```

It means that **your MongoDB server is not running**.
You need to open another CLI, run it, and keep it running so that you can use the client.



[daemon]: https://en.wikipedia.org/wiki/Daemon_(computing)
[mongodb]: https://www.mongodb.com
[mongodb-download]: https://www.mongodb.com/download-center#community
[installation-instructions]: https://docs.mongodb.com/manual/installation/
