function parse(input: string) : Line {
    if (!input) throw "missing input";
    const regex = /\d+/;
    if (!(regex.test(input))) throw "invalid input: could not find a number in it";

    const match = regex.exec(input);
    if (!match) throw "I blame TypeScript for this line of code. It's impossible to get here";
    if (match.length > 1) throw "multiple numbers found, but expected exactly 1";
    if (Number(match[0]) !== Number.parseFloat(match[0])) throw "partial number provided, but we expected a whole number"
    const distance = Number(match[0]);
   return { direction: 'up', distance: distance}; 
}

interface Line {
    direction: 'up' | 'down' | 'left' | 'right',
    distance: number
}

exports.parse = parse;