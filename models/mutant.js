const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
const mutantSchema = new Schema(
    {
        dna: String,
        isMutant: Boolean
    },
    { timestamps: true },
);
 
const Mutant = mongoose.model('Mutant', mutantSchema);
 
module.exports = Mutant;