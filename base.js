var http = require("http");
var mutant = require("./mutant");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(mutant.isMutant());
  response.end();
}).listen(8000);