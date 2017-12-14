'use strict';

const fs = require('fs');
const path = require('path');

const parse = list => {
    const scanners = list.split('\n').filter(ln => ln)
        .map(ln => ln.split(': ').map(n => parseInt(n, 10)));
    return scanners.reduce((acc, [range, depth]) => {
        acc[range] = depth
        return acc;
    }, new Array(scanners[scanners.length - 1][0]).fill(0));
};

const input = parse(fs.readFileSync(path.join(__dirname, 'day13.txt'), 'utf-8'));

const test1 = parse(`
0: 3
1: 2
4: 4
6: 4
`);

const collides = (depth, range) => depth > 0 && range % ((depth - 1) * 2) === 0;

const severity = (depth, range) => range * depth;

const totalSeverity = scanners =>
    scanners.map((d, i) => collides(d, i) ? severity(d, i) : 0)
    .reduce((acc, i) => acc + i, 0);

console.log(totalSeverity(test1));
console.log(totalSeverity(input));

const findSafePath = scanners => {
    for (var delay = 0; true; delay++) {
        if (!scanners.find((d, i) => collides(d, i + delay))) return delay;
    }
};

console.log(findSafePath(test1));
console.log(findSafePath(input));
