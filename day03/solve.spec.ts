var solve = require('./solve.js');


describe('basic parser tests', () => {
    it('parses the distance', () => {
        expect(solve.parse('2U').distance).toBe(2);
    });
});