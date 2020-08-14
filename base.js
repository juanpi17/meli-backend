var http = require("http");
var mutant = require("./mutant");

const dna1 = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
const dna2 = ["ATGCGA","CAGTTC","TTTTGT","AGTAGG","CTCCTA","TCACTG"];

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(mutant.isMutant(dna2));
  response.end();
}).listen(8000);