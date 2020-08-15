var http = require("http");
var mutant = require("./mutant");

const dna1 = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
const dna2 = ["ATGCGA","CAGTTC","TTTTGT","AGTAGG","CTCCTA","TCACTG"];
const dna3 = ["ATGCGA","CCGTTC","TTATGT","AGAAGG","CCCTTA","TCACTG"];

// not square matrix
const dna4 = ["ATGCG","CCGTTC","TTATGT","AGAGG","CCCTTA","TCACTG"];
// empty
const dna5 = [];
// other letters
const dna6 = ["ATGCGS","CCGTTC","TTATGT","AGAAGG","CCCTTA","TCACTG"];

// bigger matrix size
const dna7 = ["ATGCGAA","CAGTTCA","TTTTGTA","AGTAGGA","CTCCTAC","TCACTGG","AGTCTGA"];


http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(mutant.isMutant(dna1));
  response.end();
}).listen(8000);