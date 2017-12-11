'use strict';

const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'day11.txt'), 'utf-8')
    .replace(/\s/, '').split(',');

const origin = { x: 0, y: 0, z: 0 };
const directions = {
    n: { x: 0, y: 1, z: -1 },
    ne: { x: 1, y: 0, z: -1 },
    se: { x: 1, y: -1, z: 0 },
    s: { x: 0, y: -1, z: 1 },
    sw: { x: -1, y: 0, z: 1 },
    nw: { x: -1, y: 1, z: 0 }
};

const move = (pos, dir) => ({
    x: pos.x + dir.x,
    y: pos.y + dir.y,
    z: pos.z + dir.z
});

const distance = (p1, p2) => (Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y) +
    Math.abs(p1.z - p2.z)) / 2;

const walk = steps => steps.reduce((pos, step) => {
    const next = move(pos, directions[step]);
    const dist = distance(origin, next);
    return { ...next, max: dist > pos.max ? dist : pos.max };
}, { ...origin, max: 0 });

const findSteps = steps => distance(origin, walk(steps));
const findMaxDistance = steps => walk(steps).max;

// console.log(findSteps(['ne', 'ne', 'ne']));
// console.log(findSteps(['ne', 'ne', 'sw', 'sw']));
// console.log(findSteps(['ne', 'ne', 's', 's']));
// console.log(findSteps(['se', 'sw', 'se', 'sw', 'sw']));
console.log(findSteps(input));
console.log(findMaxDistance(input));
