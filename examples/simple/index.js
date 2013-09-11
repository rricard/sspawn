var server = require('http').createServer(function(req, res) {
  res.write('lol');
  res.end();
  bob();
});
var spawn = require('../..//index.js')(server, 3333);
spawn.start();
