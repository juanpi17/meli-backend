
// Import express framework
const express = require('express');

// Import middleware
const bodyParser = require('body-parser')

// Setup default port
const PORT = process.env.PORT || 8000

// Create express app
const app = express()

// Import mutant file
// const mutant = require("./controller/mutant");

// Implement middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Import route
const mutantRouter = require('./routes/mutant-route')

// const dna1 = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
// const dna2 = ["ATGCGA","CAGTTC","TTTTGT","AGTAGG","CTCCTA","TCACTG"];
// const dna3 = ["ATGCGA","CCGTTC","TTATGT","AGAAGG","CCCTTA","TCACTG"];

// // not square matrix
// const dna4 = ["ATGCG","CCGTTC","TTATGT","AGAGG","CCCTTA","TCACTG"];
// // empty
// const dna5 = [];
// // other letters
// const dna6 = ["ATGCGS","CCGTTC","TTATGT","AGAAGG","CCCTTA","TCACTG"];

// // bigger matrix size
// const dna7 = ["ATGCGAA","CAGTTCA","TTTTGTA","AGTAGGA","CTCCTAC","TCACTGG","AGTCTGA"];


app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>')
})

// Implement route for '/mutant' endpoint
app.use('/mutant', mutantRouter)

// Implement route for errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendStatus(403)
})

app.listen(PORT, function () {
  console.log("Server is running on "+ PORT +" port");
});

// http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write(mutant.isMutant(dna1) ? "Mutant" : "No mutant");
//   response.end();
// }).listen(8000);