'use strict';

const input = [5, 1, 10, 0, 1, 7, 13, 14, 3, 12, 8, 10, 7, 12, 0, 6];

const createKey = banks => banks.map(b => b.toString()).join(',');

const redistribute = (banks, index) => {
    let amount = banks[index];
    banks[index] = 0;
    while (amount > 0) {
        index = index >= banks.length - 1 ? 0 : index + 1;
        banks[index]++;
        amount--;
    }
    return banks;
};

const findMax = banks => banks.reduce((maxIndex, value, i, array) => {
    if (value > array[maxIndex]) {
        return i;
    } else if (value === array[maxIndex]) {
        return Math.min(maxIndex, i);
    } else {
        return maxIndex;
    }
}, 0);

const run = (banks, returnFn) => {
    let history = [ createKey(banks) ];
    while(true) {
        banks = redistribute(banks, findMax(banks));
        const bankKey = createKey(banks);
        if (history.includes(bankKey)) {
            return returnFn(history, bankKey);
        } else {
            history.push(bankKey);
        }
    }
};

const numSteps = history => history.length;

const test1 = [0, 2, 7, 0];
console.log(run(test1, numSteps));
console.log(run(input, numSteps));

const stepsSinceDup = (history, key) => history.length - history.indexOf(key);

console.log(run(test1, stepsSinceDup));
console.log(run(input, stepsSinceDup));
