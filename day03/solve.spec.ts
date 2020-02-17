const { parseLine } = require('./solve.js');


describe('basic parser tests', () => {
    it('parses the distance', () => {
        expect(parseLine('2U').distance).toBe(2);
    });
    it('parses the direction', () => {
        expect(parseLine('2U').direction).toBe('up');
    });
});