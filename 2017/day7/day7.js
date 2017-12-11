'use strict';

const fs = require('fs');
const path = require('path');

const LINE_REGEXP = /(\w+)\s+\((\d+)\)(\s+->\s+)*(([^,]+,?\s*)*)/;

const truthy = e => e;

const parseLine = line => {
    const parts = line.match(LINE_REGEXP);
    return {
        name: parts[1],
        weight: parseInt(parts[2], 10),
        children: parts[4] ? parts[4].split(', ') : []
    };
};

const parseList = list => list.split('\n').filter(truthy).map(parseLine);

const input = parseList(fs.readFileSync(path.join(__dirname, 'day7.txt'), 'utf-8'));

const findParents = (list, prog) => prog.children.length === 0 ? null :
    list.filter(parent => parent.children.includes(prog.name));

const findRoot = (list) => {
    let candidates = list.filter(prog => prog.children.length > 0);
    while (true) {
        let parents = candidates.map(prog => findParents(list, prog))
            .filter(truthy)
            .reduce((all, some) => all.concat(some), [])
            .filter((prog, i, all) => all.indexOf(prog) === i);
        if (parents.length === 0) {
            return candidates;
        }
        candidates = parents;
    }
};

const test1 = parseList(`
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`);

const testRoot = findRoot(test1)[0];
const root = findRoot(input)[0];
console.log(testRoot);
console.log(root);

const checkWeight = (list, node) => {
    if (node.children.length === 0) {
        return node.weight;
    }
    const children = node.children
        .map(childName => list.find(prog => prog.name === childName))
        .map(child => ({ ...child, total: checkWeight(list, child) }))
        .sort((a, b) => a.total < b.total);
    const sum = children.reduce((sum, child) => sum + child.total, 0);
    const diff = children.reduce((sum, next, i, arr) => sum + (arr[i - 1] ? next.total - arr[i - 1].total : 0), 0);
    if (diff !== 0) {
        console.log(children);
        const unbalanced = children.find((c1, i) => children.every((c2, j) => i === j || c1.total + diff === c2.total));
        console.log(unbalanced.weight + diff);
    }
    return node.weight + children.reduce((sum, child) => sum + child.total, 0);
};

checkWeight(test1, testRoot);
checkWeight(input, root);
