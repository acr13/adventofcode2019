const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LETTERS_HASH = LETTERS.reduce((h, c) => { h[c] = true; return h; }, {});

const START = 'AA';
const END = 'ZZ';

const map = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('20/input.txt')
});
const parseLine = line => {
  map.push([]);
  for (let i = 0; i < line.length; i++) {
    map[map.length - 1].push(line[i]);
  }
};
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  const portals = findPortals(map);
  const [start] = portals[START];
  const [end] = portals[END];
  
  console.log('Part one:', bfs(start, end, map, portals));
  // takes about 2min, but 7976.
  console.log('Part two:', bfs(start, end, map, portals, true));
});

const getPortalName = (map, row, col) => {
  let s = null;

  if (LETTERS_HASH[map[row + 1][col]]) {
    s = `${map[row + 1][col]}${map[row + 2][col]}`; // down
  } else if (LETTERS_HASH[map[row - 1][col]]) {
    s = `${map[row - 2][col]}${map[row - 1][col]}`; // up
  } else if (LETTERS_HASH[map[row][col + 1]]) {
    s = `${map[row][col + 1]}${map[row][col + 2]}`; // right
  } else {
    s = `${map[row][col - 2]}${map[row][col - 1]}`; // left
  }

  return s;
};

const categorizePortals = (map) => {
  const portals = {};

  const outerIndicies = [2, 0];

  return portals;
};

const findPortals = (map) => {
  const portals = {};

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === '.') {
        const adjacentCells = getAdjacentCells([row, col], map);
        
        const isPortal = adjacentCells.some(cell => !!LETTERS_HASH[map[cell[0]][cell[1]]]);
        if (isPortal) {
          const name = getPortalName(map, row, col);

          if (!portals[name]) {
            portals[name] = []
          }
          portals[name].push([row, col]);
        }
      }
    }
  }

  return portals;
};

const key = (pt, l) => {
  if (l) {
    return `${pt[0]},${pt[1]},${l}`;
  }
  return `${pt[0]},${pt[1]}`;
}

const getAdjacentCells = (point, map) =>
  [
    [point[0] + -1, point[1] + 0],
    [point[0] + 1, point[1] + 0],
    [point[0] + 0, point[1] + 1],
    [point[0] + 0, point[1] + -1],
  ].filter(pt => pt[0] >= 0 && pt[1] >= 0 && pt[0] < map.length && pt[1] < map[0].length);

const getNextMovesFrom = (point, map, visited, layer) => {
  const adjacentCells = getAdjacentCells(point, map);
  return adjacentCells.filter(pt => map[pt[0]][pt[1]] === '.' && !visited.includes(key(pt, layer)));
};

const bfs = (start, end, map, portals, p2) => {
  console.log('bfs', start, end);

  const queue = [[start[0], start[1], 0, []]];

  const outerPortalRows = [2, map.length - 3];
  const outerPortalCols = [2, map[0].length - 3];
  const maxRecursion = 30;

  if (p2) {
    queue[0].push(1); // current layer
  }

  let minSteps = Infinity;

  const cellToPortal = Object.keys(portals)
    .reduce((hash, p) => {
      const portal = portals[p];
      hash[key(portal[0])] = p;
      if (portal.length === 2) {
        hash[key(portal[1])] = p;
      }
      return hash;
    }, {});

  while (queue.length) {
    let [row, col, steps, visited, layer] = queue.pop();

    // base case
    if (row === end[0] && col === end[1] && (layer === undefined || layer === 1)) {
      if (steps < minSteps) {
        console.log('found an exit', steps);
        minSteps = steps;
      }
    }
    else if (layer >= maxRecursion) {
      // stop
    }
    else {
      if (!visited.includes(key([row, col], layer))) {
        let nextVisited = visited.concat(key([row, col], layer));
        let nextMoves = getNextMovesFrom([row, col], map, nextVisited, layer);

        let takePortal = false;
        let newLayer = layer;

        // console.log(cellToPortal[key([row, col])]);
        // console.log(nextMoves);

        // is this a portal?
        if (nextMoves.length === 0 && cellToPortal[key([row, col])]) {
          takePortal = true;
          const portalName = cellToPortal[key([row, col])];

          if (p2) {
            // console.log(portalName);
            const thisPortal = portals[portalName].filter(p => p[0] === row && p[1] === col)[0];
            // inner portal
            if (!outerPortalRows.includes(thisPortal[0]) && !outerPortalCols.includes(thisPortal[1])) {
              // console.log(`+${portalName}-${layer}`);
              // if (portalName === 'DH') {
              //   console.log(nextVisited);
              // }
              newLayer = newLayer + 1;
              const otherPortal = portals[portalName].filter(p => p[0] !== row || p[1] !== col)[0];
              nextVisited = visited.concat(key([otherPortal[0], otherPortal[1]], newLayer));
              nextMoves = getNextMovesFrom([otherPortal[0], otherPortal[1]], map, nextVisited, newLayer)
            } else if (newLayer > 1 && (outerPortalRows.includes(thisPortal[0]) || outerPortalCols.includes(thisPortal[1]))) {
              if (portalName !== 'AA' && portalName !== 'ZZ') {
                // outer
                // console.log(`-${portalName}-${layer}`);
                // if (portalName === 'DH') {
                //   console.log(nextVisited);
                // }
                newLayer = newLayer - 1;
                const otherPortal = portals[portalName].filter(p => p[0] !== row || p[1] !== col)[0];
                nextVisited = visited.concat(key([otherPortal[0], otherPortal[1]], newLayer));
                nextMoves = getNextMovesFrom([otherPortal[0], otherPortal[1]], map, nextVisited, newLayer)
              }
            }
          } else { // all portals are good
            const otherPortal = portals[portalName].filter(p => p[0] !== row || p[1] !== col)[0];
            nextMoves = getNextMovesFrom([otherPortal[0], otherPortal[1]], map, nextVisited)
          }
        }

        for (let i = 0; i < nextMoves.length; i++) {
          const [r, c] = nextMoves[i];
          queue.push([r, c, takePortal ? steps + 2 : steps + 1, nextVisited, newLayer]);
        }
      }
    }
  }

  return minSteps;
};