// Import express
const express = require('express')

// Import Mutant model
const Mutant = require('../models/mutant');

// Create express router
const router = express.Router()

router.get('/', function(req, res) {
    res.send("Stats section");

    // const mutant = new Mutant({
    //     "dna": '["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]',
    //     "isMutant": false
    // });

    // mutant.save((error) => {
    //     if (error) {
    //         res.status(500).json({ msg: 'Sorry, internal server errors' });
    //         return;
    //     }
    //     // Mutant Saved
    //     return res.json({
    //         msg: 'Your data has been saved!!!!!!'
    //     });
    // });
});

// Export router
module.exports = router