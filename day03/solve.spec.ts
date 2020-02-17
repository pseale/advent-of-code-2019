const { parseLine, parseFullInput, findIntersections } = require('./solve.js');

describe("findIntersections()", () => {
    describe("when the segments do not intersect", () => {
        it("errors", () => {
            const wire1 = [createSegment(0, 0, -1, -1)];
            const wire2 = [createSegment(1, 1, 2, 2)];

            expect(() => findWireIntersections([wire1, wire2])).toThrow();
        });
    });

    describe("when the segments intersect only at 0, 0", () => {
        it("errors", () => {
            const wire1 = [createSegment(0, 0, 1, 0)];
            const wire2 = [createSegment(0, 0, 0, 1)];

            expect(() => findWireIntersections([wire1, wire2])).toThrow();
        });
    })
});

function createSegment(topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number) {
    return { topLeft: { x: topLeftX, y: topLeftY }, bottomRight: { x: bottomRightX, y: bottomRightY } };
}
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