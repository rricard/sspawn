"use strict";

var ErrorHandler = function(domainName, logger, req, res) {
  this.dn = domainName;
  this.logger = logger;
  this.req = req || null;
  this.res = res || null;
};

ErrorHandler.prototype.handle = function(err) {
  this.logger.error("Error on " + this.dn + "domain");
  this.logger.error(err.stack);
  if(this.req) {
    this.logger.debug("Request used:\n" + JSON.stringify(this.req, null, 2));
    this.logger.debug("Response used:\n" + JSON.stringify(this.res, null, 2));
    this.res.end(new Error("Internal Server Error"));
  }
};

module.exports = ErrorHandler;
