exports.isMutant = function (dna) {

    var mutant = "false";
    // var mutant = false;
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

                // // console.log("\n");
                // dna.forEach(row => {
                //     Array.from(row).forEach(letter => {
                //         process.stdout.write(letter + " ");
                //     });
                //     console.log("\n");
                // });
                
                // let's count the number of sequences
                var numSeq = 0;

            } 

        }

    } catch (error) {
        console.log(error);
    } finally {
        return mutant;
    } 
};

// check matrix from left to right
// function checkHorizontalSequences(matrix) {

//     matrix.forEach(row => {
        
//     });

// }