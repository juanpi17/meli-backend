// Import express
const express = require('express')

// Import Mutant model
const Mutant = require('../models/mutant');

// Create express router
const router = express.Router()

router.get('/', async function(req, res) {

    // find all mutants
    const numMutantsDNA = await Mutant.countDocuments({ isMutant: true });
    
    // find all humans
    const numHumansDNA = await Mutant.countDocuments({ isMutant: false });

    var statsJSON = {};

    if (numMutantsDNA && numHumansDNA) {
        
        statsJSON = {
            "count_mutant_dna": numMutantsDNA,
            "count_human_dna": numHumansDNA,
            "ratio": (numMutantsDNA / numHumansDNA),
        }

    }

    // generate response
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(statsJSON));
    res.status(200);
    res.end();
});

// Export router
module.exports = router