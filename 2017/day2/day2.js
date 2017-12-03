const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'day2.txt'), 'utf-8');

const lineToNumbers = line => line.split(/\s+/)
    .map(ch => parseInt(ch, 0))
    .reduce((acc, next) => acc.concat(next), []);

const min = -999999999999;
const max = 999999999999;

const lowest = nums => nums.reduce((acc, next) => next < acc ? next : acc, max);
const highest = nums => nums.reduce((acc, next) => next > acc ? next : acc, min);
const difference = nums => highest(nums) - lowest(nums);

const checksum = (sheet, computeLine) => sheet.split(/\n/)
    .filter(line => line)
    .map(lineToNumbers)
    .reduce((acc, line) => acc + computeLine(line), 0);

const test1 ='5 1 9 5\n7 5 3\n2 4 6 8';
console.log(checksum(test1, difference));
console.log(checksum(input, difference));

const divisible = (numbers, num) => numbers
    .find(test => num !== test && num % test === 0);
const divisor = nums => nums
    .map(num => {
        const divisor = divisible(nums, num);
        return divisor !== undefined ? num / divisor : undefined;
    })
    .find(result => result !== undefined);

const test2 = '5 9 2 8\n9 4 7 3\n3 8 6 5';
console.log(checksum(test2, divisor));
console.log(checksum(input, divisor));
