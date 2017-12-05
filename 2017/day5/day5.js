const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'day5.txt'), 'utf-8')
    .split('\n').filter(step => step).map(step => parseInt(step, 10));

const jump = (jumps, index) => jumps[index]++;

const run = (jumps, jumpFn) => {
    let steps = 0;
    for (let index = 0; index >= 0 && index < jumps.length; steps++) {
        index += jumpFn(jumps, index);
    }
    return steps;
};

const test = [0, 3, 0, 1, -3];
console.log(run(test, jump));
console.log(run(input, jump));

const weirdJump = (jumps, index) =>
    jumps[index] >= 3 ? jumps[index]-- : jumps[index]++;

console.log(run(test, weirdJump));
console.log(run(input, weirdJump));
