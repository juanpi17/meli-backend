const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
const mutantSchema = new Schema(
    {
        dna: {
            type: String,
            index: true,
            unique: true
        },
        isMutant: Boolean
    },
    { timestamps: true },
);
 
const Mutant = mongoose.model('Mutant', mutantSchema);
 
module.exports = Mutant;