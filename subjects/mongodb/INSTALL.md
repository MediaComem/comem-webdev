# Installing MongoDB

https://www.mongodb.com

After downloading MongoDB, you must follow the installation procedure for your platform:

https://docs.mongodb.com/manual/installation/#tutorials



## Test MongoDB on Linux/OS X

As long as you have set up your PATH correctly, you should be able to enter the MongoDB console from your command line, and insert and find some data:

```bash
$> mongo
MongoDB shell version: 3.2.3
connecting to: test
> db.things.insert({ "fruit": "apple" })
WriteResult({ "nInserted" : 1 })
> db.things.insert({ "name": "John Doe", "age": 24 })
WriteResult({ "nInserted" : 1 })
> db.things.find()
{ "_id" : ObjectId("56ca09b5d536b4526d219ba8"), "fruit" : "apple" }
{ "_id" : ObjectId("56ca095ed536b4526d219ba7"), "name" : "John Doe", "age" : 24 }
```



## Test MongoDB on Windows

MongoDB looks for a /data/db directory by default. You can create it in Babun with the following command:

```bash
$> mkdir -p /c/data/db
```

To run the MongoDB server, run the following command in Babun (adapt the path if your MongoDB installation is elsewhere):

```bash
$> "/c/Program Files/MongoDB/Server/3.2/bin/mongod.exe"

2016-02-22T07:25:52.998+0100 I CONTROL  [initandlisten] MongoDB starting : pid=203 port=27017 dbpath=/opt/local/var/db/mongodb 64-bit host=Phaeton.local
2016-02-22T07:25:52.999+0100 I CONTROL  [initandlisten] db version v3.0.7
2016-02-22T07:25:52.999+0100 I CONTROL  [initandlisten] git version: nogitversion
2016-02-22T07:25:52.999+0100 I CONTROL  [initandlisten] build info: Darwin tenten-slave.macports.org 14.5.0 Darwin Kernel Version 14.5.0: Wed Jul 29 02:26:53 PDT 2015; root:xnu-2782.40.9~1/RELEASE_X86_64 x86_64 BOOST_LIB_VERSION=1_49
2016-02-22T07:25:52.999+0100 I CONTROL  [initandlisten] allocator: system
2016-02-22T07:25:52.999+0100 I CONTROL  [initandlisten] options: { storage: { dbPath: "/opt/local/var/db/mongodb" }, systemLog: { destination: "file", logAppend: true, path: "/opt/local/var/log/mongodb/mongodb.log" } }
2016-02-22T07:25:57.514+0100 I NETWORK  [initandlisten] waiting for connections on port 27017
```

If you see Waiting for connections on port 27017, it means your MongoDB server is running. It will keep running until you hit Ctrl-C to stop it.

To run a MongoDB client, you must use the Windows command line and not Babun, as there are interaction bugs with Babun:

```bash
$> "C:\Program Files\MongoDB\Server\3.2\bin\mongo.exe"
MongoDB shell version: 3.2.3
connecting to: test
> db.things.insert({ "fruit": "apple" })
WriteResult({ "nInserted" : 1 })
> db.things.insert({ "name": "John Doe", "age": 24 })
WriteResult({ "nInserted" : 1 })
> db.things.find()
{ "_id" : ObjectId("56ca09b5d536b4526d219ba8"), "fruit" : "apple" }
{ "_id" : ObjectId("56ca095ed536b4526d219ba7"), "name" : "John Doe", "age" : 24 }
```
