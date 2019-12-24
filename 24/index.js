let grid = [
  ['.', '.', '.', '.', '#'],
  ['#', '.', '.', '#', '.'],
  ['#', '#', '.', '.', '#'],
  ['#', '.', '#', '#', '#'],
  ['.', '#', '#', '#', '#']

  // test
  // ['.', '.', '.', '.', '#'],
  // ['#', '.', '.', '#', '.'],
  // ['#', '.', '.', '#', '#'],
  // ['.', '.', '#', '.', '.'],
  // ['#', '.', '.', '.', '.']
];

const R = grid.length;
const C = grid[0].length;
const BOTTOM_L = -100;
const L = 100;
const BUG = '#';
const EMPTY = '.';

const key = (grid) => grid.join('');
const key2 = (r, c, l) => `${r},${c},${l}`;

const adjCells = (row, col) =>
  [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ].map(delta => [row + delta[0], col + delta[1]])
  .filter(cell => cell[0] >= 0 && cell[1] >= 0 && cell[0] < R && cell[1] < C);

const getNextGrid = (grid) => {
  return grid.map((row, r) => {
    return row.map((cell, c) => {
      const cs = adjCells(r, c);
      const bugs = cs.filter(c => grid[c[0]][c[1]] === '#').length;
      
      if (cell === BUG && bugs === 1) {
        return BUG;
      } else if (cell === EMPTY && (bugs === 1 || bugs === 2)) {
        return BUG;
      }

      return EMPTY;
    });
  });
};

const getBiodiversity = (grid) => {
  let sum = 0;
  let tile = 0;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (grid[i][j] === BUG) {
        sum += Math.pow(2, tile);
      }
      tile++;
    }
  }

  return sum;
};

const getPartOne = (grid) => {
  const SEEN = {};

  while (true) {
    const nextGrid = getNextGrid(grid);
    const gridKey = key(nextGrid);

    if (SEEN[gridKey]) {
      return getBiodiversity(nextGrid);
    }

    SEEN[gridKey] = true;
    grid = nextGrid;
  }
};

const getNextRecursiveGrid = (E, V) => {
  let V2 = {};
  const ks = Object.keys(V);

  for (let i = 0; i < ks.length; i++) {
    let k = ks[i];
    let bugs = 0;
    for (let j = 0; j < E[k].length; j++) {
      const [row, col, level] = E[k][j];
      const k2 = key2(row, col, level);
      if (V[k2]) {
        bugs++;
      }
    }

    if (V[k] && bugs === 1) {
      V2[k] = true;
    } else if (V[k] === false && (bugs === 1 || bugs === 2)) {
      V2[k] = true;
    } else {
      V2[k] = false;
    }
  }

  return V2;
}

const getPartTwo = (grid) => {
  let V = {}; // verticies
  const E = {}; // edges

  // 1. setup our world
  // populate E - all edges in our -100 <=> 100 levels
  // populate V - keep track of all bugs in the simulation
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      // center square is not real
      if (i === 2 && j === 2) {
        continue;
      }

      // for each level...
      for (let l = BOTTOM_L; l <= L; l++) {
        const k = key2(i, j, l);
        V[k] = false;
        if (l === 0 && grid[i][j] === BUG) { 
          V[k] = true;
        }

        // base case - adj cells in our flat world
        // get adj cells,
        // pluck center square
        // add level
        const cells = adjCells(i, j)
          .filter(c => c[0] !== 2 || c[1] !== 2)
          .map(c => [...c, l]);
        
        if (!E[k]) { E[k] = []; }
        E[k].push(...cells);

        // hard part, the up and down grids
        // top row, can I go up
        if (i === 0 && (l - 1) >= BOTTOM_L) {
          E[k].push([1, 2, l - 1]); // row 1, col 2 is the square above
        }
        // left col, go up
        if (j === 0 && (l - 1) >= BOTTOM_L) {
          E[k].push([2, 1, l - 1]);
        }
        // bottom row, go up
        if (i === (R-1) && (l - 1) >= BOTTOM_L) {
          E[k].push([3, 2, l - 1]);
        }
        // right col, go up
        if (j === (C-1) && (l - 1) >= BOTTOM_L) {
          E[k].push([2, 3, l - 1]);
        }

        // go inwards - multiple rows per cell
        // in [1,2], go downwards (entire top row)
        if (i === 1 && j === 2 && l + 1 <= L) {
          for (let cc = 0; cc < C; cc++) {
            E[k].push([0, cc, l + 1])
          }
        }
        // [2, 1], go downwards (entire left col)
        if (i === 2 && j === 1 && l + 1 <= L) {
          for (let rr = 0; rr < R; rr++) {
            E[k].push([rr, 0, l + 1]);
          }
        }
        // [3, 2], go downards (entire top row)
        if (i === 3 && j === 2 && l + 1 <= L) {
          for (let cc = 0; cc < C; cc++) {
            E[k].push([R - 1, cc, l + 1]);
          }
        }
        // [2, 3] go downwards (entire right col)
        if (i === 2 && j === 3 && l + 1 <= L) {
          for (let rr = 0; rr < R; rr++) {
            E[k].push([rr, C - 1, l + 1]);
          }
        }
      }
    }
  }

  let i = 0;
  while (i < 200) {
    const V2 = getNextRecursiveGrid(E, V);
    V = V2;
    i++;
  }

  let bugs = 0; 
  const ks = Object.keys(V);
  for (let i = 0; i < ks.length; i++) {
    if (V[ks[i]]) {
      bugs++;
    }
  }

  return bugs;
};


console.log('Part one:', getPartOne(grid));
console.log('Part two:', getPartTwo(grid));