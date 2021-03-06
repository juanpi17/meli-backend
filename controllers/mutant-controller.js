// Import Mutant model
const Mutant = require('../models/mutant');

exports.isMutant = async (req, res) => {

    if (!req.body.dna) {
        res.status(403).send("No DNA to check")
    }

    // get dna from request body
    const dna = req.body.dna;

    if ( checkIfMutant(dna) ) 
        res.status(200).send("Mutant")
    else
        res.status(403).send("Not mutant") 
};

// main functionality. Allow testing
function checkIfMutant(dna) {

    var mutant = false;
    // true if the dna is valid (mutant or not mutant)
    var dnaProcessed = false;
    // length of the sequence to be matched
    var sequenceLength = 4;
    // allowed sequence letters
    var allowedLetters = ['A', 'T', 'C', 'G'];

    try {

        // if dna isn't an array, not mutant
        if (Array.isArray(dna) && dna.length > 0) {

            var squareMatrix = true;
            var allowedMatrix = true;

            // if the matrix isn't square, not mutant
            var vLength = dna.length;
            dna.forEach((row, index) => {
                if (row.length != vLength){
                    squareMatrix = false;
                }

                // if the matrix has other letters than the allowed, not mutant
                Array.from(row).forEach((letter, i) => {
                    if (!allowedLetters.includes(letter)) {
                        allowedMatrix = false;
                    }
                });
            });

            // only process data if it's an square matrix and contains valid letters
            if (squareMatrix && allowedMatrix ) {

                // dna valid!
                dnaProcessed = true;
                // convert string to 2d array
                var dnaMatrix = convertArrayToMatrix(dna);
                // generate all the allowed sequences
                var sequences = generateSearchequences(allowedLetters, sequenceLength);

                // get number of matches
                var numSeq = searchSequences(dnaMatrix, sequences);
                mutant = numSeq > 1 ? true : false;
            } 

        }

    } catch (error) {
        console.log(error);
    } finally {

        // save into database if the dna was processed.
        if (dnaProcessed) {

            // create a string to make it easy to compare
            var dnaString = dna.join();

            const mutantDB = new Mutant({
                "dna": dnaString,
                "isMutant": mutant
            });

            // only insert if the dna isn't in the database yet
            Mutant.updateOne(
                {dna: dnaString}, 
                {$setOnInsert: mutantDB},
                {upsert: true}, 
                function(err) {
                    if (err) {
                        console.log('Sorry, internal server errors');
                    }
                }
            );
        }

        return mutant;
    } 
}

exports.checkIfMutant = checkIfMutant;

// convert dna array to a matrix 
function convertArrayToMatrix(dna) {
    var dnaMatrix = [];
    dna.forEach(row => {
        var dnaRow = [];
        Array.from(row).forEach(letter => {
            dnaRow.push( letter );
        });
        dnaMatrix.push( dnaRow );
    });

    return dnaMatrix;
}

// generate sequences 
function generateSearchequences(searchArray, number) {
    var sequences = [];
    searchArray.forEach(letter => {
        sequences.push( Array.from(letter.repeat(number)) );
    });

    return sequences;
}

// do the main loop of the search function
function searchSequences(dna, sequences) {

    var numMatchesSeq = 0;
    // store the positions of the letters that were matched
    var matchesFound = [];
    sequences.forEach(seq => {
        matchesFound[seq] = [];
    });
    
    // go through all the sequences
    sequences.forEach(seq => {
        for (let r = 0; r < dna.length; r++) {
            for (let c = 0; c < dna.length; c++) {
                numMatchesSeq += searchOnDnaMatrix(dna, seq, r, c, matchesFound);
            }
        }
    });

    // if a sequence on the dna matrix is longer than the sequence to be matched, it will be duplicated. Let's fix that.
    numMatchesSeq = removePossibleDuplicates(matchesFound, sequences, numMatchesSeq);

    return numMatchesSeq;
}

// main search function. Process all the 4 directions: horizontal, vertical and 2 diags
function searchOnDnaMatrix(dna, sequence, row, col, matchesFound) {
    var numSeq = 0;

    // try to search sequence only if the letter from the dna is part of the sequence
    // as the first position is already matched, start from the next one
    if (dna[row][col] === sequence[0]) {
        // there are only 4 possible directions to search: horizontal, vertical, main diagonal and secondary diagonal

        // Horizontal matches
        var n;
        var positions = [row + ',' + col];
        for (n = 1; n < sequence.length; n++) {
            if (col + n >= dna.length || col + n < 0) 
                break;

            if (typeof dna[row][col + n] === 'undefined' || dna[row][col + n] !== sequence[n])
                break;

            positions.push( row + ',' + (col + n) );
        }

        // if the length of the sequence has the same value as n (length of the sequence in the dna) increment numSeq
        if (sequence.length === n) {
            numSeq++;
            matchesFound[sequence].push( positions );
        }

        // Vertical matches
        for (n = 1; n < sequence.length; n++) {
            if (row + n >= dna.length || row + n < 0) 
                break;

            if (typeof dna[row + n][col] === 'undefined' || dna[row + n][col] !== sequence[n])
                break;

            positions.push( (row + n) + ',' + col );
        }

        // if the length of the sequence has the same value as n (length of the sequence in the dna) increment numSeq
        if (sequence.length === n) {
            numSeq++;
            matchesFound[sequence].push( positions );
        }

        // Main diagonal matches 
        for (n = 1; n < sequence.length; n++) {
            if (row + n >= dna.length || row + n < 0 || col + n >= dna.length || col + n < 0) 
                break;

            if (typeof dna[row + n][col + n] === 'undefined' || dna[row + n][col + n] !== sequence[n])
                break;

            positions.push( (row + n) + ',' + (col + n) );
        }

        // if the length of the sequence has the same value as n (length of the sequence in the dna) increment numSeq
        if (sequence.length === n) {
            numSeq++;
            matchesFound[sequence].push( positions );
        }

        // Secondary diagonal matches 
        for (n = 1; n < sequence.length; n++) {
            if (row - n >= dna.length || row - n < 0 || col + n >= dna.length || col + n < 0) 
                break;

            if (typeof dna[row - n][col + n] === 'undefined' || dna[row - n][col + n] !== sequence[n])
                break;

            positions.push( (row - n) + ',' + (col + n) );
        }

        // if the length of the sequence has the same value as n (length of the sequence in the dna) increment numSeq
        if (sequence.length === n) {
            numSeq++;
            matchesFound[sequence].push( positions );
        }

    }

    return numSeq; 
} 


// prevent counting matches of longer sequences twice
function removePossibleDuplicates(matchesFound, sequences, numMatchesSeq) {
    
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    }

    sequences.forEach(seq => {

        for (let i = 0; i < matchesFound[seq].length; i++) {

            for (let j = i + 1; j < matchesFound[seq].length; j++) {
                // join the results to make it easier compare them
                let merge = matchesFound[seq][i].concat(matchesFound[seq][j]);

                // remove duplicated values. Ideally, the size of the filtered sequence is the size of the 2 concatenated arrays - 1 (the origin)
                let filter = merge.filter(unique);

                // if the filtered array has less positions than the 2 arrays combined minus the shared node, it's a duplicated match
                if (filter.length < (2 * seq.length - 1)) {
                    numMatchesSeq--;
                }
            }
        }

    });

    return numMatchesSeq;
}
