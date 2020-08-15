// Import express
const express = require('express')

// Import items controller
const mutantController = require('../controllers/mutant-controller.js')

// Create express router
const router = express.Router()

// Create route between mutantController and '/all' endpoint
// Note:
// Main route (in server.js) for mutant
// is set to '/mutant'
// This means that all items routes
// will be prefixed with /mutant'
router.post('/', mutantController.isMutant)
router.get('/', function(req, res) {
    res.send("Send POST request to analyse DNA");
});

// Export router
module.exports = router