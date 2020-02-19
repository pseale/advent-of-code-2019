// https://stackoverflow.com/a/43573897
import { checkIntersection } from "line-intersect";
import { sign } from "crypto";

function parse(input: string) : Line {
    if (!input) throw "missing input";
    const regex = /\d+/;
    if (!(regex.test(input))) throw "invalid input: could not find a number in it";

    const match = regex.exec(input);
    if (!match) throw "I blame TypeScript for this line of code. It's impossible to get here";
    if (match.length > 1) throw "multiple numbers found, but expected exactly 1";
    if (Number(match[0]) !== Number.parseFloat(match[0])) throw "partial number provided, but we expected a whole number"
    const distance = Number(match[0]);

    const directionCharacter = input[0];
    return { direction: getDirection(directionCharacter), distance: distance}; 
}

function getDirection(c: string) {
    if (c.toLowerCase() === 'u') return 'up';
    if (c.toLowerCase() === 'd') return 'down';
    if (c.toLowerCase() === 'l') return 'left';
    if (c.toLowerCase() === 'r') return 'right';
    throw `invalid direction '${c}' provided`;
}

interface Line {
    direction: 'up' | 'down' | 'left' | 'right',
    distance: number
}

function parseInput(input: string) {
    if (!input) throw "missing input";
    
    const linesOfText = input.split('\n').map(x => x.trim()).filter(x => x !== null && x !== "");
    if (linesOfText.length !== 2) throw `expected 2 non-empty lines, but got ${linesOfText.length}`;

    const wires = [];

    for (const text of linesOfText) {
        const lines = text.split(',').map(x => x.trim()).filter(x => x !== null && x !== "");
        wires.push(lines.map(x => parse(x)));
    }
    
    return wires;
}

interface Point {
    x: number,
    y: number
}

interface Intersection {
    x: number,
    y: number,
    signalDelay: number
}

interface Segment {
    start: Point,
    end: Point,
}

function findClosest(intersections: Point[]) {
    // I wish I had LINQ right now
    // meanwhile I'm refusing to use lodash, which has many great options to help solve this "find minimum" problem 
    return Math.min(...(intersections.map(x => Math.abs(x.x) + Math.abs(x.y))));
}

function findWireIntersections(wires: Segment[][]) : Point[] {
    if (wires.length !== 2) throw "expected exactly 2 wires";

    const wire1 = wires[0];
    const wire2 = wires[1];
    let intersections : Intersection[] = [];

    let wire1SignalDelay = 0;
    for (let s1 of wire1) {

        let wire2SignalDelay = 0;
        for (let s2 of wire2) {
            const result = checkIntersection(s1.start.x, s1.start.y, s1.end.x, s1.end.y, s2.start.x, s2.start.y, s2.end.x, s2.end.y);
            
            if (result.type === 'intersecting') {
                if (!result.point) throw "this is required by the TypeScript compiler and/or imperfect type definitions in the library I referenced. Anyway, error.";
                if (!Number.isInteger(result.point.x)) throw `x value ${result.point.x} must be a whole number`;
                if (!Number.isInteger(result.point.y)) throw `y value ${result.point.y} must be a whole number`;

                // ignore intersections at point 0,0
                if (result.point.x !== 0 || result.point.y !== 0) {
                    const signalDelay = wire1SignalDelay + calculateDistance(result.point, s1.start) + wire2SignalDelay + calculateDistance(result.point, s2.start);
                    intersections.push({ x: result.point.x, y: result.point.y, signalDelay: signalDelay });
                }
            }

            wire2SignalDelay += calculateDistance(s2.start, s2.end);
        }

        wire1SignalDelay += calculateDistance(s1.start, s1.end);
    }

    if (intersections.length === 0) throw "expected to find at least one intersection";

    return intersections;
}

function calculateDistance(a: Point, b: Point) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function convertLinesToSegments(lines: Line[]) {
    let nextStartingPosition = { x: 0, y: 0 };

    const segments = [];
    for (const line of lines) {
        const { next, segment } = convertLineToSegment(nextStartingPosition, line)
        nextStartingPosition = next;
        segments.push(segment);
    }

    return segments;
}

function convertLineToSegment(startingPosition: Point, line: Line) {
    const newPosition = getNewPosition(startingPosition, line);

    return { next: newPosition, segment: { start: startingPosition, end: newPosition } };
}

function getNewPosition(startingPosition: Point, line: Line) {
    if (line.direction === 'up')
        return { x: startingPosition.x, y: startingPosition.y - line.distance };
    if (line.direction === 'down')
        return { x: startingPosition.x, y: startingPosition.y + line.distance };
    if (line.direction === 'left')
        return { x: startingPosition.x - line.distance, y: startingPosition.y };
    if (line.direction === 'right')
        return { x: startingPosition.x + line.distance, y: startingPosition.y };

    throw "should not possible to reach this location, since the only possible directions are u,d,l,r";
}

exports.parseLine = parse;
exports.parseFullInput = parseInput;
exports.findIntersections = findWireIntersections;
exports.convert = convertLinesToSegments;
exports.findClosestIntersection = findClosest;
exports.calculateDistance2 = calculateDistance;