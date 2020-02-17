const { parseLine, parseFullInput } = require('./solve.js');
const solve = require('./solve.js');

describe('individual line parser tests', () => {
    it('parses the distance', () => {
        expect(parseLine('2U').distance).toBe(2);
    });
    it('parses the direction', () => {
        expect(parseLine('2U').direction).toBe('up');
    });
});

describe('full input parser tests', () => {
    it('parses two wires correctly', () => {
        const i = '2U,3D\n4L,5R,6U'
        const wires = parseFullInput(i);
        expect(wires.length).toBe(2);

        const w1lines = wires[0];
        expect(w1lines.length).toBe(2);
        expect(w1lines[0].direction).toBe('up');
        expect(w1lines[0].distance).toBe(2);

        const w2lines = wires[1];
        expect(w2lines.length).toBe(3);
        expect(w2lines[0].direction).toBe('left');
        expect(w2lines[0].distance).toBe(4);
    });
});