function interpret(memory: number[]) {
    let instructions = []
    let i = 0;
    while (i + 3 <= memory.length) {
        if (memory[i] === 99) {
            return instructions;
        }

        let instruction = {
                opcode: memory[i],
                input1: memory[i+1],
                input2: memory[i+2],
                output: memory[i+3],
                activeAddresses: [i, i+1, i+2, i+3]
        } as Instruction;

        instructions.push(instruction);
        i += 4;
    }
    throw "Instructions are missing opcode 99";
}

function get(memory : number[], steps : Step[], address : number) {
    const memoryOverrides = steps.filter(x => x.target === address);
    if (memoryOverrides.length > 0) {
        return memoryOverrides[memoryOverrides.length-1].targetValue;
    }

    return memory[address];
}

function process(memory : number[], steps : Step[], instruction : Instruction) {
    if (instruction.opcode === 1) {
        return { 
            operands: [instruction.input1, instruction.input2],
            target: instruction.output,
            targetValue: get(memory, steps, instruction.input1) + get(memory, steps, instruction.input2),
            activeAddresses: instruction.activeAddresses
        };
    } else if (instruction.opcode === 2) {
        return { 
            operands: [instruction.input1, instruction.input2],
            target: instruction.output,
            targetValue: get(memory, steps, instruction.input1) * get(memory, steps, instruction.input2),
            activeAddresses: instruction.activeAddresses
        };
    } else {
        throw "impossible opcode found";
    }
}

function execute(memory: number[]) {
    let instructions = interpret(memory);
    let steps: Step[] = [];
    for (let i = 0; i < instructions.length; i++) {
        steps.push(process(memory, steps, instructions[i]))
    }
    return steps;
}

function solvePartA(rawMemory : number[], modifications : number[]) {
    const memoryBefore = [rawMemory[0]];
    const memoryAfter = rawMemory.slice(memoryBefore.length + modifications.length);
    const memory = memoryBefore.concat(modifications).concat(memoryAfter);
    return { memory, steps: execute(memory) };
}

function solvePartB(memory : number[], targetOutput : number) {

    for (let instruction1 = 0; instruction1 < 100; instruction1++) {
        for (let instruction2 = 0; instruction2 < 100; instruction2++) {
            const result = solvePartA(memory, [instruction1, instruction2]);
            if (get(result.memory, result.steps, 0) === targetOutput) {
                return [instruction1, instruction2];
            }
        }
    }

    throw "Could not find instructions to produce the desired output";
}
export { solvePartA, solvePartB };

interface Step {
    operands: number[],
    target : number,
    targetValue : number,
    activeAddresses: number[]
}
interface Instruction {
    opcode : 1 | 2,
    input1 : number,
    input2 : number,
    output : number,
    activeAddresses: number[]
}