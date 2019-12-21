const KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const DOORS = KEYS.map(k => k.toUpperCase());
const map = [];
const keys = {};
const doors = {};
const distances = {};
const pos = [-1, -1];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('18/test.txt')
});
const parseLine = line => {
  let row = [];
  for (let i = 0; i < line.length; i++) {
    const c = line[i];

    if (c === '@') {
      pos[0] = map.length;
      pos[1] = i;
    } else if (KEYS.includes(c)) {
      keys[c] = [map.length, i];
    } else if (DOORS.includes(c)) {
      doors[c] = [map.length, i];
    }

    row.push(c);
  }
  map.push(row);
};

lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  calculateDistances();
  console.log('Part one:', shortestPathToGetKeys(pos, map));
});

const key = (pos) => `${pos[0]},${pos[1]}`;

const getNextMovesFrom = (move, map) =>
  [
    [move[0] - 1, move[1]],
    [move[0] + 1, move[1]],
    [move[0], move[1] + 1],
    [move[0], move[1] - 1],
  ].filter(newMove => newMove[0] >= 0 && newMove[1] >= 0 &&
    newMove[0] < map[0].length && newMove[1] < map[0].length && 
    map[newMove[0]][newMove[1]] !== '#'
  );

const calculateDistances = () => {
  distances[key(pos)] = bfs(pos, map);

  const ks = Object.keys(keys);
  for (let i = 0; i < ks.length; i++) {
    const k = ks[i];
    distances[key(keys[k])] = bfs(keys[k], map);
  }
};

const bfs = (point, map) => {
  // 'state' will have [row, col, steps, ]
  const visited = new Set();
  const queue = [[point[0], point[1], 0, []]];
  visited.add(key(point));

  // hash of { [key: string]: steps }
  const foundKeys = {};

  while (queue.length) {
    let [row, col, steps, doors] = queue.pop();
    
    visited.add(key([row, col]));

    const foundDoor = DOORS.find(door => door === map[row][col]);
    if (foundDoor) {
      doors = doors.concat(foundDoor);
    }

    // found a key
    const foundKey = KEYS.find(key => key === map[row][col]);
    if (foundKey && foundKey !== map[point[0]][point[1]]) {
      foundKeys[foundKey] = [row, col, steps, doors];
    }

    const nextMoves = getNextMovesFrom([row, col], map);

    for (let i = 0; i < nextMoves.length; i++) {
      const [dRow, dCol] = nextMoves[i];
      if (!visited.has(key([dRow, dCol]))) {
        visited.add(key([dRow, dCol]));
        queue.push([dRow, dCol, steps + 1, doors]);
      }
    }
  }

  return foundKeys;
};

const unlockDoor = (door) => {
  const ks = Object.keys(distances);
  for (let i = 0; i < ks.length; i++) {
    const k = ks[i];
    console.log(distances[k]);
    distances[k][3] = distances[k][3].filter(d => d != door);
  }
}

const shortestPathToGetKeys = (startPos, map) => {
  let steps = 0;
  const doorsOpened = {};
  const targetKeys = Object.keys(keys);
  let keysCollected = []

  let pos = [...startPos];
  let i = 0;
  while (i < 1) { // keysCollected.length !== targetKeys.length) {
    // what keys can I reach right now
    const keysWithinReach = distances[key(pos)];
    const keysWithOpenDoors = Object.keys(keysWithinReach).filter(key => keysWithinReach[key][3].length === 0);
    
    const movesToMake = keysWithOpenDoors
      .map(key => keysWithinReach[key])
      .sort((a, b) => a[2] - b[2]);
    const move = movesToMake[0];

    pos = [move[0], move[1]]
    steps += move[2];

    const thisKey = map[pos[0]][pos[1]];
    keysCollected.push(thisKey);
    doorsOpened[thisKey.toUpperCase()] = true;

    // unlock the doors
    unlockDoor(thisKey.toUpperCase());
    i++;
  }
  
  return steps;
};
