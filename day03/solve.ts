function parse(input: string) : Line {
    if (!input) throw "missing input";
    const regex = /\d+/;
    if (!(regex.test(input))) throw "invalid input: could not find a number in it";

    const match = regex.exec(input);
    if (!match) throw "I blame TypeScript for this line of code. It's impossible to get here";
    if (match.length > 1) throw "multiple numbers found, but expected exactly 1";
    if (Number(match[0]) !== Number.parseFloat(match[0])) throw "partial number provided, but we expected a whole number"
    const distance = Number(match[0]);

    const directionCharacter = input[input.length - 1];
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

interface Segment {
    topLeft: Point,
    bottomRight: Point,
}

function findWireIntersections(wires: Segment[][]) {

    throw "hey";
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

    if (line.direction === 'down' || line.direction === 'right') {
        // we went down or to the right, so the starting position is at the top left
        return { next: newPosition, segment: { topLeft: startingPosition, bottomRight: newPosition } };
    } else {
        // went up or to the left, so the new position is at the top left
        return { next: newPosition, segment: { topLeft: newPosition, bottomRight: startingPosition } };
    }
}

function getNewPosition(startingPosition: Point, line: Line) {
    if (line.direction === 'up')
        return { x: startingPosition.x, y: startingPosition.y + line.distance };
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