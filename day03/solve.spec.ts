const { parseLine, parseFullInput } = require('./solve.js');
const solve = require('./solve.js');

describe('individual line parser tests', () => {
    it('parses', () => {
        expectLineToBe(parseLine('2U'), 2, 'up');
    })
});

describe('full input parser tests', () => {
    it('parses two wires correctly', () => {
        const i = '2U,3D\n4L,5R,6U'
        const wires = parseFullInput(i);
        expect(wires.length).toBe(2);

        const w1lines = wires[0];
        expect(w1lines.length).toBe(2);
        expectLineToBe(w1lines[0], 2, 'up');

        const w2lines = wires[1];
        expect(w2lines.length).toBe(3);
        expectLineToBe(w2lines[0], 4, 'left');
    });
});

function expectLineToBe(l : any, distance: number, direction: 'up'|'down'|'left'|'right') {
    expect(l).toBeTruthy();
    expect(l.direction).toBe(direction);
    expect(l.distance).toBe(distance);


}