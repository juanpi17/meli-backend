
// Import express framework
const express = require('express');

// Import middleware
const bodyParser = require('body-parser')

// Setup default port
const PORT = process.env.PORT || 8000

// Create express app
const app = express()

// Implement middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import route
const mutantRouter = require('./routes/mutant-route')

app.get('/', function (req, res) {
  res.send('<h1>Meli Backend Test</h1><p>See https://github.com/juanpi17/meli-backend for more details</p><p>Created by Juan Pablo Lepore</p>')
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