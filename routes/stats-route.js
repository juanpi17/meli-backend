// Import express
const express = require('express')

// Import Mutant model
const Mutant = require('../models/mutant');

// Create express router
const router = express.Router()

router.get('/', function(req, res) {
    res.send("Stats section");
});

// Export router
module.exports = router