'use strict';

const fs = require('fs');
const path = require('path');

const LINE_REGEXP = /(\d+) <-> (\d+(,\s\d+)*).*/;

const truthy = e => e;

const parseLine = line => {
    const parts = line.match(LINE_REGEXP);
    return {
        id: parts[1],
        neighbors: parts[2] ? parts[2].split(', ') : []
    };
};

const parseInput = list => list.split('\n').filter(truthy).map(parseLine)
    .reduce((map, e) => { map[e.id] = e.neighbors; return map; }, {});

const input = parseInput(fs.readFileSync(path.join(__dirname, 'day12.txt'), 'utf-8'));

const test1 = parseInput(`
0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`);

const visitNeighbors = (village, visited, current) => {
    visited.add(current);
    const unvisited = village[current].filter(id => !visited.has(id));
    if (unvisited.length === 0) return visited;
    unvisited.forEach(id => visitNeighbors(village, visited, id));
    return visited;
};

const findGroup = (village, start) =>
    visitNeighbors(village, new Set(), start);

console.log(findGroup(test1, '0').size);
console.log(findGroup(input, '0').size);

const findAllGroups = (village) => {
    const allVisited = [];
    return Object.keys(village).reduce((groups, id) => {
        if (!allVisited.includes(id)) {
            const group = findGroup(village, id);
            group.forEach(id => allVisited.push(id));
            groups.push(group);
        }
        return groups;
    }, []);
};

console.log(findAllGroups(test1).length);
console.log(findAllGroups(input).length);
