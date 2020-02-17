var solve = require('./solve.js');


describe('basic parser tests', () => {
    it('parses the distance', () => {
        expect(solve.parse('2U').distance).toBe(2);
    });
    it('parses the direction', () => {
        expect(solve.parse('2U').direction).toBe('up');
    });
});