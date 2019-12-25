const DR = [1, 0, -1, 0];
const DC = [0, 1, 0, -1];
const GRID = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('18/input2.txt')
});
const parseLine = line => GRID.push(line.split(''));
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  // 6162
  // console.log('Part one:', partOne(GRID));

  // use file input2.txt
  // 1556
  console.log('Part two:', partTwo(GRID));
});

const getKey = (row, col, keys) => {
  const sortedKeys = [...keys].sort().join('');
  return `${row},${col},${sortedKeys}`;
};

const clone = (x) => JSON.parse(JSON.stringify(x));
const pk = (r, c, value) => `${r},${c},${value}`;

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

const unlock = (grid, pos) => {
  const newGrid = clone(grid);
  const cell = newGrid[pos[0]][pos[1]];

  newGrid[pos[0]][pos[1]] = '.';

  if ('a' <= cell && cell <= 'z') {
    const door = cell.toUpperCase();

    for (let r = 0; r < newGrid.length; r++) {
      for (let c = 0; c < newGrid[0].length; c++) {
        if (newGrid[r][c] === door) {
          newGrid[r][c] = '.';
        }
      }
    }
  }

  return newGrid;
}

const partTwo = (GRID) => {
  const allKeysLocations = [];
  const starts = [];

  // walk the grid, find our starting point
  // also make a set of all of the keys
  for (let r = 0; r < GRID.length; r++) {
    for (let c = 0; c < GRID[0].length; c++) {
      if (GRID[r][c] === '@') {
        starts.push([r, c]);
      } else if ('a' <= GRID[r][c] && GRID[r][c] <= 'z') {
        allKeysLocations.push([r, c, GRID[r][c]]);
      }
    }
  }

  const distances = calculateDistances(GRID, allKeysLocations.concat(starts));

  const hashKey = (pos, found) => `${pos.join('-')};${found.join(',')}`;
  let minimum = Infinity;
  const queue = [{ poss: starts, dist: 0, found: [], grid: GRID }];
  const allKeys = new Set();
  
  while (queue.length) {
    const work = queue.sort((a, b) => a.dist - b.dist).shift();
    const newGrid = work.poss.reduce((grid, pos) => {
      return unlock(grid, pos);
    }, work.grid);

    const hk = hashKey(work.poss, work.found.sort());

    if (work.found.length === allKeysLocations.length && work.dist < minimum) {
      console.log('got there', work.dist);
      minimum = work.dist;
    }

    if (allKeys.has(hk)) {
      continue;
    }

    allKeys.add(hk);

    const availableKeys = work.poss.map(pos => {
      return findAvailableKeys(newGrid, pos);
    });

    availableKeys.forEach((keyset, robot) => {
      for (const k of keyset) {
        const [key, ...pos] = k;
        const poss = [...work.poss]; // clone(work.poss);
        const robotPos = poss[robot];
        const dist = distances[pk(robotPos[0], robotPos[1], key)];

        poss[robot] = pos;
        const newWork = {
          poss,
          dist: work.dist + dist,
          found: work.found.concat([key]),
          grid: newGrid,
        };
        queue.push(newWork);
      }
    });
  }

  return minimum;
};

const findAvailableKeys = (grid, start) => {
  const seen = new Set();
  const found = [];
  const queue = [start];

  while (queue.length) {
    const [r, c] = queue.shift();
    const k = `${r},${c}`;

    if (seen.has(k)) {
      continue;
    }
    seen.add(k);

    // invalid, or wall
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] === '#') {
      continue;
    }
    // door
    if ('A' <= grid[r][c] && grid[r][c] <= 'Z') {
      continue;
    }
    // key :)
    if ('a' <= grid[r][c] && grid[r][c] <= 'z') {
      found.push([grid[r][c], r, c]);
    }

    for (let i = 0; i < 4; i++) {
      queue.push([r + DR[i], c + DC[i]]);
    }
  }

  return found;
}

const calculateDistances = (GRID, keys) => {
  const distances = {};
  const R = GRID.length;
  const C = GRID[0].length;

  for (const origin of keys) {
    const [startRow, startCol, _] = origin;
    const queue = [[startRow, startCol, 0]];
    const visited = new Set();

    while (queue.length) {
      const [r, c, d] = queue.shift();

      if (visited.has(`${r},${c}`)) {
        continue;
      }

      visited.add(`${r},${c}`);

      // wall or invalid
      if (r < 0 || r >= R || c < 0 || c >= C || GRID[r][c] === '#') {
        continue;
      }

      // key - mark this location in our hash
      if ('a' <= GRID[r][c] && GRID[r][c] <= 'z') {
        distances[pk(startRow, startCol, GRID[r][c])] = d;
      }

      for (let i = 0; i < 4; i++) {
        queue.push([r + DR[i], c + DC[i], d + 1]);
      }    
    }
  }

  return distances;
};