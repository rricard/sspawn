"use strict";
var ErrorHandler = require('./error.js');
var domain = require('domain');

var Spawner = function(server, port, workers, logger) {
  this.server = server;
  this.port = port;
  this.workers = workers;
  this.logger = logger;

  this.cluster = require('cluster');
};

Spawner.prototype.start = function() {
  if(this.cluster.isMaster) {
    this.logger.log("Spawning " + this.workers + " workers ...");

    for(var i = 0; i < this.workers; i ++) {
      this.cluster.fork();
    }

    this.logger.log("Workers up and running !");

    this.cluster.on('disconnect', function(worker) {
      this.logger.error("Worker disconnected !");
      this.logger.log("Restarting worker ...");
      this.cluster.fork();
      this.logger.log("Worker restarted !");
    });
  } else {
    var serverDomain = domain.create();
    var serverEH = new ErrorHandler("server", this.logger, null, null);

    if(this.server.hasOwnProperty('use')) {
      this.server.use(function(req, res, next) {
        var requestDomain = domain.create();
        var requestEH = new ErrorHandler("request", this.logger, req, res);
        requestDomain.add(req);
        requestDomain.add(res);
        requestDomain.on('error', requestEH.handle);
      });
    }

    var self = this;
    serverDomain.on('error', serverEH.handle);
    serverDomain.run(function() {
      self.server.listen(self.port, function() {
        self.logger.log("Server listening on port " + self.port);
      });
    });
  }
};
