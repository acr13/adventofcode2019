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
  // console.log('Part one:', shortestPathToGetKeys(pos, map));
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

  console.log(distances);
};

const bfs = (point, map) => {
  // 'state' will have [row, col, steps, ]
  const visited = new Set();
  const queue = [[point[0], point[1], 0, new Set()]];
  visited.add(key(point));

  // hash of { [key: string]: steps }
  const foundKeys = {};

  while (queue.length) {
    const [row, col, steps, doors] = queue.pop();
    
    visited.add(key([row, col]));

    console.log(map[row][col])
    console.log(doors);
    const foundDoor = DOORS.find(door => door === map[row][col]);
    if (foundDoor) {
      console.log('d');
    //   continue;
    }

    // found a key
    const foundKey = KEYS.find(key => key === map[row][col]);
    if (foundKey && foundKey !== map[point[0]][point[1]]) {
      foundKeys[foundKey] = [row, col, steps];
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

const shortestPathToGetKeys = (startPos, map) => {
  let steps = 0;

  let pos = [...startPos];
  const keysToGet = bfs(pos, map);
  
  // for ()
  
  return steps;
};
