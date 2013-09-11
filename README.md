sspawn
======

Simple and fault-tolerant server spawner for Node.js

What ?
------

sspawn uses node's cluster library to create forked processes of your application. When an error occurs, well, it's catched in a domain. Basically, your worker will crash but it will be recreated in seconds while the others continues processing requests.

So when uncatched and critical errors occurs, your node server continues working.

There's also a slight performance boost. Two synchronous tasks can run in parallel now. It's like a super-lightweight unicorn-like server for node.

Installation
------------

`npm install sspawn`

Usage
-----

```javascript
// Given a server (node http module, express, restify, ...)
var server = ...;

// Require sspawn to create a Spawner instance, pass it the server, the port and the options
var spawner = require(server, 8000);

// Spawn !
spawner.start();
```

Documentation
-------------

### `require('sspawn')(server)`

Create a spawner based on a server on port 8000 and logging to console

### `require('sspawn')(server, port)`

Pass a port

### `require('sspawn')(server, port, options)`

Add one of those options:

* `logger` Your logger (ex: console or winston)
* `port` The port, again
* `workers` How many workers do you want to spawn ?

### `require('sspawn')(server, options)`

Pass directly the options

### `.start()`

Start the spawner
