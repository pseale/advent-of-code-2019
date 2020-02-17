const { parseLine, parseFullInput, findIntersections } = require('./solve.js');

describe("findIntersections()", () => {
    describe("when the segments do not intersect", () => {
        it("errors", () => {
            const s1 = { topLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 } };
            const s2 = { topLeft: { x: 1, y: 1 }, bottomRight: { x: 1, y: 1 } };

            expect(() => findIntersections([[s1], [s2]])).toThrow();
        });
    });
});
describe('parseLine()', () => {
    it('parses', () => {
        expectLineToBe(parseLine('2U'), 2, 'up');
    })
});

describe('parseFullInput()', () => {
    it('parses two wires correctly', () => {
        const wires = parseFullInput('2U,3D\n4L,5R,6U');
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