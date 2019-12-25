const DR = [1, 0, -1, 0];
const DC = [0, 1, 0, -1];
const GRID = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('18/test6.txt')
});
const parseLine = line => GRID.push(line.split(''));
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  // 6162
  // console.log('Part one:', partOne(GRID));
  const distances = calculateDistances(GRID);
  // console.log('Part two:', partTwo(GRID));
});

const getKey = (row, col, keys) => {
  const sortedKeys = [...keys].sort().join('');
  return `${row},${col},${sortedKeys}`;
}

const partOne = (GRID) => {
  const allKeys = new Set();
  const queue = [];

  // walk the grid, find our starting point
  // also make a set of all of the keys
  for (let r = 0; r < GRID.length; r++) {
    for (let c = 0; c < GRID[0].length; c++) {
      if (GRID[r][c] === '@') {
        queue.push([r, c, new Set(), 0]);
      } else if ('a' <= GRID[r][c] && GRID[r][c] <= 'z') {
        allKeys.add(GRID[r][c]);
      }
    }
  }

  const NUM_ALL_KEYS = allKeys.size;
  const SEEN = new Set();

  while (queue.length) {
    const [r, c, keys, d] = queue.shift();
    const key = getKey(r, c, keys);

    if (SEEN.has(key)) {
      continue;
    }

    SEEN.add(key);

    // invalid, or wall
    if (r < 0 || r >= GRID.length || c < 0 || c >= GRID[0].length || GRID[r][c] === '#') {
      continue;
    }
    // door that we haven't unlocked
    if ('A' <= GRID[r][c] && GRID[r][c] <= 'Z' && !keys.has(GRID[r][c].toLowerCase())) {
      continue;
    }

    const newKeys = new Set(keys);

    // key - pick it up and sort our list
    if ('a' <= GRID[r][c] && GRID[r][c] <= 'z') {
      newKeys.add(GRID[r][c]);

      if (newKeys.size === NUM_ALL_KEYS) {
        return d;
      }
    }

    for (let i = 0; i < 4; i++) {
      queue.push([r + DR[i], c + DC[i], newKeys, d + 1]);
    }
  }
};

const partTwo = (GRID) => {
  const allKeys = new Set();
  const queue = [];
  const starts = [];

  // walk the grid, find our starting point
  // also make a set of all of the keys
  for (let r = 0; r < GRID.length; r++) {
    for (let c = 0; c < GRID[0].length; c++) {
      if (GRID[r][c] === '@') {
        starts.push([r, c]);
        queue.push([r, c, new Set(), 0]);
      } else if ('a' <= GRID[r][c] && GRID[r][c] <= 'z') {
        allKeys.add(GRID[r][c]);
      }
    }
  }

  const NUM_ALL_KEYS = allKeys.size;
  const SEEN = new Set();

  while (queue.length) {
    const [r, c, keys, d] = queue.shift();
    const key = getKey(r, c, keys);

    for (let i = 0; i < 4; i++) {
      queue.push([r + DR[i], c + DC[i], newKeys, d + 1]);
    }
  }

  console.log(starts);
};

const calculateDistances = (GRID) => {
  const distances = {};

  return distances;
};