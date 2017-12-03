const input = 265149;

const createKey = (x, y) => `${x + ''},${y + ''}`;

const computeValue = (x, y) => {
    let value = 0;
    [ -1, 0, 1 ].forEach(xOffset => {
        [ -1, 0, 1 ].forEach(yOffset => {
            let adj = squares[createKey(x + xOffset, y + yOffset)];
            if (adj !== undefined) {
                value += adj.val;
            }
        });
    });
    return { x, y, val: value };
};

const square0 = { x: 0, y: 0, val: 1 };
let squares = { [createKey(square0.x, square0.y)]: square0 };

let cur = square0;
let next;
let ring = 0;
let dir = { x: 1, y: 0 };

while (cur.val < input) {
    if (cur.x === cur.y && cur.x >= 0) {
        next = { x: cur.x + 1, y: cur.x };
        ring = ring + 1;
    }

    if (Math.abs(cur.x) + Math.abs(cur.y) === ring * 2) {
        if (dir.x === 0) {
            dir = { x: dir.y, y: dir.x };
        } else {
            dir = { x: -1 * dir.y, y: -1 * dir.x};
        }
    } else if (Math.abs(cur.x) === ring && cur.x * dir.x > 0) {
        dir = { x: 0, y: -1 * dir.x };
    } else if (Math.abs(cur.y) === ring && cur.y * dir.y > 0) {
        dir = { x: -1 * dir.y, y: 0 };
    }

    next = computeValue(cur.x + dir.x, cur.y + dir.y);
    squares[createKey(next.x, next.y)] = next;
    cur = next;
    console.log(next);
}
