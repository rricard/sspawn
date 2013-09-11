"use strict";

var Spawner = require("./lib/sspawn/spawner.js");

var api = function(server) {
  var options = {};
  var port = 8000;
  if(typeof arguments[1] == "object") {
    options = arguments[1];
    port = options.port || port;
  } else if(typeof arguments[1] == "number") {
    port = arguments[1];
    if(typeof arguments[2] == "object") {
      options = arguments[2];
    }
  }
  var logger = options.logger || console;
  var workers = options.workers || 4;

  return new Spawner(server, port, workers, logger);
};

module.exports = api;
