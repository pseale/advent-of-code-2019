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

exports.parse = parse;