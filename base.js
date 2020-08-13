var http = require("http");
var mutant = require("./mutant");

const dna1 = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(mutant.isMutant(dna1));
  response.end();
}).listen(8000);