// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import middleware
const bodyParser = require('body-parser')

// Create express app
const app = express()

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
    mongoose.set('useUnifiedTopology', false)
}

// Implement middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import routes
const mutantRouter = require('./routes/mutant-route')
const statsRouter = require('./routes/stats-route')

app.get('/', function (req, res) {
  res.send('<h1>Meli Backend Test</h1><p>See https://github.com/juanpi17/meli-backend for more details</p><p>Created by Juan Pablo Lepore</p>')
})

// Implement route for '/mutant' endpoint
app.use('/mutant', mutantRouter)

// Implement route for '/stats' endpoint
app.use('/stats', statsRouter)

// Implement route for errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendStatus(403)
})

// Export server
module.exports = app