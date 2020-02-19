const { parseLine, parseFullInput, findIntersections, convert } = require('./solve.js');

describe("findIntersections()", () => {
    describe("when the segments do not intersect", () => {
        it("errors", () => {
            const wire1 = [createSegment(0, 0, -1, -1)];
            const wire2 = [createSegment(1, 1, 2, 2)];

            expect(() => findIntersections([wire1, wire2])).toThrow();
        });
    });

    describe("when the segments intersect only at 0, 0", () => {
        it("errors", () => {
            const wire1 = [createSegment(0, 0, 1, 0)];
            const wire2 = [createSegment(0, 0, 0, 1)];

            expect(() => findIntersections([wire1, wire2])).toThrow();
        });
    });

    describe("when the segments intersect successfully", () => {
        it("finds the intersection", () => {
            // .|.
            // ++- <-- we expect the two wires to meet up at 1,-1
            // ++.
            const intersections = findFor('U1,R2\nR1,U2');
            expect(intersections.length).toBe(1);

            const i = intersections[0];
            expect(i.x).toBe(1);
            expect(i.y).toBe(-1);
        });
    });
});

function findFor(input: string) {
    const wires = parseFullInput(input);
    const segments = wires.map((x:any) => convert(x));
    return findIntersections(segments);
}
function createSegment(topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number) {
    return { topLeft: { x: topLeftX, y: topLeftY }, bottomRight: { x: bottomRightX, y: bottomRightY } };
}

describe('convert()', () => {

    it('converts', () => {
        // note I could construct a perfectly isolated Wire object, but who cares about isolation in something this small?
        const lines = parseFullInput('U1,R2\nU0')[0];
        const segments = convert(lines);
        expect(segments.length).toBe(2);

        // segment 1 starts at 0,0 and goes 1U to 0,1
        const s1 = segments[0];
        expect(s1.topLeft.x).toBe(0);
        expect(s1.topLeft.y).toBe(-1);
        expect(s1.bottomRight.x).toBe(0);
        expect(s1.bottomRight.x).toBe(0);
    });
});
describe('parseLine()', () => {
    it('parses', () => {
        expectLineToBe(parseLine('U2'), 2, 'up');
    })
});

describe('parseFullInput()', () => {
    it('parses two wires correctly', () => {
        const wires = parseFullInput('U2,D3\nL4,R5,U6');
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