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

exports.parseLine = parse;
exports.parseFullInput = parseInput;