exports.isMutant = function (dna) {

    var mutant = "false";
    // var mutant = false;
    var sequenceLength = 4;
    var allowedLetters = ['A', 'T', 'C', 'G'];

    try {

        // if dna isn't an array, return false
        if (Array.isArray(dna)) {

            var squareMatrix = true;
            var allowedMatrix = true;

            // if the matrix isn't square, return false
            var vLength = dna.length;

            console.log("vLength = " + vLength);
            dna.forEach((row, index) => {
                if (row.length != vLength){
                    squareMatrix = false;
                }

                Array.from(row).forEach((letter, i) => {
                    console.log("Letter " + i + " = " + letter);
                    if (!allowedLetters.includes(letter)) {
                        allowedMatrix = false;
                    }
                });
                console.log("Row " + index + " = " + row.length);
            });

            // only process data if it's an square matrix and contains valid letters
            if (squareMatrix && allowedMatrix ) {

                mutant = "Valid matrix";

                // console.log("\n");
                // dna.forEach(row => {
                //     Array.from(row).forEach(letter => {
                //         process.stdout.write(letter + " ");
                //     });
                //     console.log("\n");
                // });
                
                var dnaMatrix = convertArrayToMatrix(dna);

                
                // console.log("G = " +  dnaMatrix[1][4]);
                // console.log("C = " + dnaMatrix[1][5]);

                // console.log("\n");
                // dnaMatrix.forEach(row => {
                //     row.forEach(letter => {
                //         process.stdout.write(letter + " ");
                //     });
                //     console.log("\n");
                // });

                console.log(dnaMatrix);

                // let's count the number of sequences
                var numSeq = 0;
                var sequences = generateSearchequences(allowedLetters, sequenceLength);

                console.log(sequences);

                searchSequences(dnaMatrix, sequences);

                // searchOnDnaMatrix(dnaMatrix, sequences[1], 5, 0);



                // searchOnDnaMatrix(dnaMatrix, sequences[1], 5, 0);

                // Horizontal matrix
                //numSeq += searchHorizontalSequences(dna, sequences);

                //var vDna = convertVerticalMatrix(dna);

                // console.log("\nVertical\n");
                // vDna.forEach(row => {
                //     Array.from(row).forEach(letter => {
                //         process.stdout.write(letter + " ");
                //     });
                //     console.log("\n");
                // });
            } 

        }

    } catch (error) {
        console.log(error);
    } finally {
        return mutant;
    } 
};

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


function searchSequences(dna, sequences) {

    var numMatchesSeq = 0;

    // sequences.map(seq => {
        
    sequences.forEach(seq => {

        for (let r = 0; r < dna.length; r++) {
            
            for (let c = 0; c < dna.length; c++) {

                // numMatchesSeq += searchOnDnaMatrix(dna, sequences[2], r, c);
                numMatchesSeq += searchOnDnaMatrix(dna, seq, r, c);
            }
        }

    });

    //     return numMatchesSeq += searchOnDnaMatrix(dna, seq, 0, 0);
    // });

    console.log("\nFinal = " + numMatchesSeq);
}


function searchOnDnaMatrix(dna, sequence, row, col) {
    var numSeq = 0;

    // try to search sequence only if the letter from the dna is part of the sequence
    console.log("\n" + sequence);
    if (dna[row][col] === sequence[0]) {

        // as the first position is already matched, start from the next one

        // there are only 4 possible directions to search: horizontal, vertical, main diagonal and secondary diagonal 

        // Horizontal matches
        var n;
        for (n = 1; n < sequence.length; n++) {

            if (col + n >= dna.length || col + n < 0) 
                break;

            if (typeof dna[row][col + n] === 'undefined' || dna[row][col + n] !== sequence[n])
                break;

        }

        // if the length of the sequence has the same value as n (length of the sequence in the dna) increment numSeq
        if (sequence.length === n) {
            numSeq++;
        }

        
        process.stdout.write("H:" + numSeq);
        // numSeq = 0;

        // Vertical matches
        for (n = 1; n < sequence.length; n++) {

            if (row + n >= dna.length || row + n < 0) 
                break;

            if (typeof dna[row + n][col] === 'undefined' || dna[row + n][col] !== sequence[n])
                break;

        }

        // if the length of the sequence has the same value as n (length of the sequence in the dna) increment numSeq
        if (sequence.length === n) {
            numSeq++;
        }

        process.stdout.write(", V:" + numSeq);
        // numSeq = 0;

        // Main diagonal matches 
        for (n = 1; n < sequence.length; n++) {
            
            if (row + n >= dna.length || row + n < 0 || col + n >= dna.length || col + n < 0) 
                break;

            if (typeof dna[row + n][col + n] === 'undefined' || dna[row + n][col + n] !== sequence[n])
                break;

        }

        // if the length of the sequence has the same value as n (length of the sequence in the dna) increment numSeq
        if (sequence.length === n) {
            numSeq++;
        }

        process.stdout.write(", D1:" + numSeq);
        // numSeq = 0;

        // Secondary diagonal matches 
        for (n = 1; n < sequence.length; n++) {
            
            if (row - n >= dna.length || row - n < 0 || col + n >= dna.length || col + n < 0) 
                break;

            if (typeof dna[row - n][col + n] === 'undefined' || dna[row - n][col + n] !== sequence[n])
                break;
        }

        // if the length of the sequence has the same value as n (length of the sequence in the dna) increment numSeq
        if (sequence.length === n) {
            numSeq++;
        }

        process.stdout.write(", D2:" + numSeq);
       
    }

    return numSeq; 
} 


// generate sequences 
function generateSearchequences(searchArray, number) {
    var sequences = [];
    searchArray.forEach(letter => {
        sequences.push( Array.from(letter.repeat(number)) );
    });

    return sequences;
}