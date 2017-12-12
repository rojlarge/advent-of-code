'use strict';

const fs = require('fs');
const path = require('path');

const LINE_REGEXP = /(\w+)\s(\w+)\s([-\w]+)\sif\s(.+)$/;

const truthy = e => e;

const parseLine = line => {
    const parts = line.match(LINE_REGEXP);
    return {
        register: parts[1],
        command: parts[2] === 'inc' ? '+' : '-',
        amount: parts[3],
        condition: parts[4]
    };
};

const parseInput = list => list.split('\n').filter(truthy).map(parseLine);

const input = parseInput(fs.readFileSync(path.join(__dirname, 'day8.txt'), 'utf-8'));

const test1 = parseInput(`
b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`);

const geval = eval;

const findLargestValue = instructions =>
    instructions.reduce((largest, {register, ..._}) => {
        const registerValue = eval(register);
        return registerValue > largest ? registerValue : largest;
    }, 0);

const largestAtEnd = (instructions, scripts) => {
    geval(scripts.join(' ')); return findLargestValue(instructions);
};

const computeLargest = (instructions, largestFn) => {
    geval(instructions.map(i => `var ${i.register} = 0;`).join(' '));
    return largestFn(instructions, instructions
        .map(({register, command, amount, condition}) =>
        `if(${condition}) ${register} = ${register} ${command} ${amount};`));
}

console.log(computeLargest(test1, largestAtEnd));
console.log(computeLargest(input, largestAtEnd));

const largestAtAnyPoint = (instructions, scripts) =>
    scripts.reduce((largest, script) => {
        geval(script);
        const currentLargest = findLargestValue(instructions);
        return currentLargest > largest ? currentLargest : largest;
    }, 0);

console.log(computeLargest(test1, largestAtAnyPoint));
console.log(computeLargest(input, largestAtAnyPoint));
