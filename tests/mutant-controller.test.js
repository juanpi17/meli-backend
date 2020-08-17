// Import items controller
const { checkIfMutant } = require('../controllers/mutant-controller.js');

test('Mutant', () => {

    var dna1 = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]; // mutant
    var dna2 = ["ATGCGA","CCGTTC","TTATGT","AGAAGG","CCCTTA","TCACTG"]; // not mutant
    var dna3 = ["ATGCGA","CCGTTC","TTATGT","AGAAGG","CCCTTA"]; // not NxN
    var dna4 = ["ATGSSS","CCGTTC","TTATGT","AGAAGG","CCCTTA","TCACTG"]; // not allowed letters

    expect(checkIfMutant(dna1)).toBe(true);
    expect(checkIfMutant(dna2)).toBe(false);
    expect(checkIfMutant(dna3)).toBe(false);
    expect(checkIfMutant(dna4)).toBe(false);
});