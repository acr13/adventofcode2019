// IntCode consts
const END_STATE = 99;
let program = {};
const input = [
  1,330,331,332,109,3890,1102,1,1182,16,1102,1471,1,24,101,0,0,570,1006,570,36,1002,571,1,0,1001,570,-1,570,1001,24,1,24,1105,1,18,1008,571,0,571,1001,16,1,16,1008,16,1471,570,1006,570,14,21102,58,1,0,1105,1,786,1006,332,62,99,21102,333,1,1,21102,73,1,0,1105,1,579,1102,0,1,572,1102,1,0,573,3,574,101,1,573,573,1007,574,65,570,1005,570,151,107,67,574,570,1005,570,151,1001,574,-64,574,1002,574,-1,574,1001,572,1,572,1007,572,11,570,1006,570,165,101,1182,572,127,101,0,574,0,3,574,101,1,573,573,1008,574,10,570,1005,570,189,1008,574,44,570,1006,570,158,1105,1,81,21102,1,340,1,1106,0,177,21102,1,477,1,1106,0,177,21101,0,514,1,21101,0,176,0,1105,1,579,99,21101,184,0,0,1106,0,579,4,574,104,10,99,1007,573,22,570,1006,570,165,102,1,572,1182,21101,375,0,1,21101,0,211,0,1105,1,579,21101,1182,11,1,21102,1,222,0,1106,0,979,21102,1,388,1,21101,0,233,0,1106,0,579,21101,1182,22,1,21102,244,1,0,1105,1,979,21102,401,1,1,21102,1,255,0,1106,0,579,21101,1182,33,1,21101,266,0,0,1105,1,979,21102,1,414,1,21102,277,1,0,1105,1,579,3,575,1008,575,89,570,1008,575,121,575,1,575,570,575,3,574,1008,574,10,570,1006,570,291,104,10,21101,0,1182,1,21101,313,0,0,1105,1,622,1005,575,327,1101,0,1,575,21102,327,1,0,1105,1,786,4,438,99,0,1,1,6,77,97,105,110,58,10,33,10,69,120,112,101,99,116,101,100,32,102,117,110,99,116,105,111,110,32,110,97,109,101,32,98,117,116,32,103,111,116,58,32,0,12,70,117,110,99,116,105,111,110,32,65,58,10,12,70,117,110,99,116,105,111,110,32,66,58,10,12,70,117,110,99,116,105,111,110,32,67,58,10,23,67,111,110,116,105,110,117,111,117,115,32,118,105,100,101,111,32,102,101,101,100,63,10,0,37,10,69,120,112,101,99,116,101,100,32,82,44,32,76,44,32,111,114,32,100,105,115,116,97,110,99,101,32,98,117,116,32,103,111,116,58,32,36,10,69,120,112,101,99,116,101,100,32,99,111,109,109,97,32,111,114,32,110,101,119,108,105,110,101,32,98,117,116,32,103,111,116,58,32,43,10,68,101,102,105,110,105,116,105,111,110,115,32,109,97,121,32,98,101,32,97,116,32,109,111,115,116,32,50,48,32,99,104,97,114,97,99,116,101,114,115,33,10,94,62,118,60,0,1,0,-1,-1,0,1,0,0,0,0,0,0,1,32,0,0,109,4,2101,0,-3,586,21002,0,1,-1,22101,1,-3,-3,21101,0,0,-2,2208,-2,-1,570,1005,570,617,2201,-3,-2,609,4,0,21201,-2,1,-2,1105,1,597,109,-4,2105,1,0,109,5,1201,-4,0,630,20102,1,0,-2,22101,1,-4,-4,21102,0,1,-3,2208,-3,-2,570,1005,570,781,2201,-4,-3,652,21001,0,0,-1,1208,-1,-4,570,1005,570,709,1208,-1,-5,570,1005,570,734,1207,-1,0,570,1005,570,759,1206,-1,774,1001,578,562,684,1,0,576,576,1001,578,566,692,1,0,577,577,21102,1,702,0,1105,1,786,21201,-1,-1,-1,1106,0,676,1001,578,1,578,1008,578,4,570,1006,570,724,1001,578,-4,578,21101,0,731,0,1106,0,786,1105,1,774,1001,578,-1,578,1008,578,-1,570,1006,570,749,1001,578,4,578,21102,756,1,0,1106,0,786,1106,0,774,21202,-1,-11,1,22101,1182,1,1,21101,774,0,0,1106,0,622,21201,-3,1,-3,1105,1,640,109,-5,2105,1,0,109,7,1005,575,802,21001,576,0,-6,20101,0,577,-5,1105,1,814,21102,1,0,-1,21101,0,0,-5,21101,0,0,-6,20208,-6,576,-2,208,-5,577,570,22002,570,-2,-2,21202,-5,41,-3,22201,-6,-3,-3,22101,1471,-3,-3,1202,-3,1,843,1005,0,863,21202,-2,42,-4,22101,46,-4,-4,1206,-2,924,21102,1,1,-1,1105,1,924,1205,-2,873,21101,35,0,-4,1106,0,924,2102,1,-3,878,1008,0,1,570,1006,570,916,1001,374,1,374,2101,0,-3,895,1102,1,2,0,1201,-3,0,902,1001,438,0,438,2202,-6,-5,570,1,570,374,570,1,570,438,438,1001,578,558,922,20101,0,0,-4,1006,575,959,204,-4,22101,1,-6,-6,1208,-6,41,570,1006,570,814,104,10,22101,1,-5,-5,1208,-5,59,570,1006,570,810,104,10,1206,-1,974,99,1206,-1,974,1101,0,1,575,21101,0,973,0,1106,0,786,99,109,-7,2106,0,0,109,6,21102,0,1,-4,21101,0,0,-3,203,-2,22101,1,-3,-3,21208,-2,82,-1,1205,-1,1030,21208,-2,76,-1,1205,-1,1037,21207,-2,48,-1,1205,-1,1124,22107,57,-2,-1,1205,-1,1124,21201,-2,-48,-2,1105,1,1041,21102,1,-4,-2,1106,0,1041,21102,-5,1,-2,21201,-4,1,-4,21207,-4,11,-1,1206,-1,1138,2201,-5,-4,1059,1202,-2,1,0,203,-2,22101,1,-3,-3,21207,-2,48,-1,1205,-1,1107,22107,57,-2,-1,1205,-1,1107,21201,-2,-48,-2,2201,-5,-4,1090,20102,10,0,-1,22201,-2,-1,-2,2201,-5,-4,1103,2101,0,-2,0,1106,0,1060,21208,-2,10,-1,1205,-1,1162,21208,-2,44,-1,1206,-1,1131,1105,1,989,21102,1,439,1,1105,1,1150,21101,477,0,1,1106,0,1150,21102,1,514,1,21101,1149,0,0,1105,1,579,99,21101,1157,0,0,1106,0,579,204,-2,104,10,99,21207,-3,22,-1,1206,-1,1138,2101,0,-5,1176,1202,-4,1,0,109,-6,2105,1,0,32,5,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,30,11,30,1,40,1,40,1,30,13,38,1,1,1,26,5,7,1,1,1,26,1,3,1,7,1,1,1,26,1,3,1,7,1,1,1,26,1,3,1,7,1,1,1,26,1,3,1,7,1,1,1,1,11,14,1,3,1,7,1,1,1,1,1,9,1,14,1,3,1,7,13,1,1,14,1,3,1,9,1,1,1,7,1,1,1,14,1,3,1,9,13,14,1,3,1,11,1,7,1,12,13,3,13,12,1,3,1,3,1,3,1,3,1,3,1,12,13,3,13,12,1,7,1,11,1,3,1,16,1,7,1,11,1,3,1,16,1,7,1,11,1,3,1,16,13,7,1,3,1,24,1,3,1,7,1,3,1,14,11,3,1,7,1,3,1,14,1,13,1,7,1,3,1,14,1,13,1,7,1,3,1,14,1,13,1,7,1,3,1,14,1,13,1,7,5,14,1,13,1,26,1,13,1,26,1,13,1,26,1,13,1,26,1,13,1,26,1,3,11,26,1,3,1,36,9,36,1,3,1,36,1,3,1,36,1,3,1,36,1,3,1,36,1,3,1,36,1,3,1,36,1,3,1,36,1,3,1,36,1,3,1,36,5,32
];

// IntCode helpers
const getValue = (pointer) => program[pointer] ? program[pointer] : 0;
const getIndex = (program, mode, pointer, relativeBase) => {
  if (mode === 0) {
    return program[pointer]
  } else if (mode === 1) {
    return pointer;
  } else { // mode === 2
    return relativeBase + program[pointer];
  }
};
const getNextPointer = (code, p) => {
  if (code === 1 || code === 2) {
    return p + 4;
  } else if (code === 3 || code === 4 || code === 9) {
    return p + 2;
  } else if (code === 5 || code === 6) {
    return p + 3;
  } else if (code === 7 || code === 8) {
    return p + 4;
  }
};

// Day 17
const SCAFFOLD = 35;
const SPACE = 46;
const NEWLINE = 10;
const ROBOT = 94;
const COMMA = 44;
const CODE_TO_ASCII = {
  [SCAFFOLD]: '#',
  [SPACE]: '.',
  [NEWLINE]: '\n',
  [ROBOT]: '^', 
};
const getKey = (row, col) => `${row},${col}`;

const asciiSystem = (input, p2) => {
  for (let i = 0; i < input.length; i++) {
    program[i] = input[i];
  }

  let pointer = 0;
  let relativeBase = 0;

  // day 17 vars
  const robot = { row: -1, col: -1, facing: 'U' };
  const gridHash = { };
  const grid = [ [] ];
  let currentRow = 0;

  if (p2) {
    program[0] = 2;
  }

  //  A,B,B,C,C,A,B,B,C,A
  // 'R,4,R,12,R,10,L,12'
  // 'L,12,R,4,R,12'
  // 'L,12,L,8,R,10'
  const MASTER_PATH = [65, 44, 66, 44, 66, 44, 67, 44, 67, 44, 65, 44, 66, 44, 66, 44, 67, 44, 65, 10];
  const A = [82, 44, 52, 44, 82, 44, 49, 50, 44, 82, 44, 49, 48, 44, 76, 44, 49, 50, 10];
  const B = [76, 44, 49, 50, 44, 82, 44, 52, 44, 82, 44, 49, 50, 10];
  const C = [76, 44, 49, 50, 44, 76, 44, 56, 44, 82, 44, 49, 48, 10];
  const ROBOT_INPUT = [...MASTER_PATH, ...A, ...B, ...C, 121, 10];
  const outputStack = [];
  let robotInput = 0;

  while (program[pointer] !== END_STATE) {
    let opcode = program[pointer];

    // get our opcode into a list of parts
    let parts = opcode.toString().split('').map(Number);
    while (parts.length < 5) {
      parts = [0, ...parts];
    }
    let code = parts[4];

    // get our parameters
    let x = getIndex(program, parts[2], pointer + 1, relativeBase);
    let y = getIndex(program, parts[1], pointer + 2, relativeBase);
    let z = getIndex(program, parts[0], pointer + 3, relativeBase);

    let jumped = false;

    if (code === 1) {
      program[z] = getValue(x) + getValue(y);
    } else if (code === 2) {
      program[z] = getValue(x) * getValue(y);
    } else if (code === 3) {
      if (p2) {
        program[x] = ROBOT_INPUT[robotInput];
        robotInput++;
      }
    } else if (code === 4) {
      const output = program[x];
      if (p2) {
        outputStack.push(output);
      }

      if (output === NEWLINE) {
        grid.push([]);
        currentRow++;
      } else {
        grid[currentRow].push(CODE_TO_ASCII[output]);
        gridHash[getKey(currentRow, grid[currentRow].length - 1)] = CODE_TO_ASCII[output];

        if (output === ROBOT) {
          robot.row = currentRow;
          robot.col = grid[currentRow].length - 1;
        }
      }
    } else if (code === 5) {
      if (getValue(x) !== 0) {
        jumped = true;
        pointer = getValue(y);
      }
    } else if (code === 6) {
      if (getValue(x) === 0) {
        jumped = true;
        pointer = getValue(y);
      }
    } else if (code === 7) {
      if (getValue(x) < getValue(y)) {
        program[z] = 1;
      } else {
        program[z] = 0;
      }
    } else if (code === 8) {
      if (getValue(x) === getValue(y)) {
        program[z] = 1;
      } else {
        program[z] = 0;
      }
    } else if (code === 9) {
      relativeBase += getValue(x)
    } else {
      console.log('fail at pointer', pointer);
      return;
    }

    if (!jumped) {
      pointer = getNextPointer(code, pointer);
    }
  }

  // jesus fuck
  if (!p2) {
    for (let i = 0; i < grid[0].length; i++) {
      grid[grid.length - 2][i] = CODE_TO_ASCII[SPACE];
      grid[grid.length - 1][i] = CODE_TO_ASCII[SPACE];
    }

    for (let i = 0; i < grid.length; i++) {
      let line = '';
      for (let j = 0; j < grid[i].length; j++) {
        line += grid[i][j];
      }
      console.log(line);
    }

    const sumOfAlignmentParams = Object.keys(gridHash)
      .filter(key => gridHash[key] === CODE_TO_ASCII[SCAFFOLD])
      .filter(hashKey => {
        const [row, col] = hashKey.split(',').map(Number);
        return [
          [-1, 0],
          [0, 1],
          [1, 0],
          [0, -1],
        ].every(delta => gridHash[getKey(row + delta[0], col + delta[1])] === CODE_TO_ASCII[SCAFFOLD])
      })
      .reduce((sum, intersectionKey) => {
        const [row, col] = intersectionKey.split(',').map(Number);
        return sum + (row * col);
      }, 0);
    console.log('Part one:', sumOfAlignmentParams);
    return getPath(robot, grid, gridHash);
  } else {
    return outputStack[outputStack.length - 1];
  }
};

const getDirectionRelative = (current, next) => {
  if (current === 'U') {
    return next === 'R' ? 'R' : 'L';
  } else if (current === 'R') {
    return next === 'U' ? 'L' : 'R';
  } else if (current === 'D') {
    return next === 'R' ? 'L' : 'R';
  } else { // current === 'L
    return next === 'U' ? 'R' : 'L';
  }
}

const getPath = (robot, grid, gridHash) => {
  let path = '';

  const visited = new Set();
  const deltas = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const directions = ['U', 'R', 'D', 'L'];

  let pos = { ...robot, relative: null };
  
  while (true) {
    // 1. find where the path goes around me 
    // (face the right direction)
    const deltaIndex = deltas.findIndex(delta => {
      return gridHash[getKey(pos.row + delta[0], pos.col + delta[1])] === CODE_TO_ASCII[SCAFFOLD] && !visited.has(getKey(pos.row + delta[0], pos.col + delta[1]))
    });


    // no more new scaffolds to walk on, we're done
    if (deltaIndex === -1) {
      return path.substring(0, path.length - 1);
    }

    pos.relative = getDirectionRelative(pos.facing, directions[deltaIndex]);
    pos.facing = directions[deltaIndex];

    // 2. move in that direction!
    let steps = 0;
    while (grid[pos.row][pos.col] !== CODE_TO_ASCII[SPACE] && pos.row >= 0 && pos.col >= 0 && pos.row < grid.length && pos.col < grid[0].length) {
      pos.row += deltas[deltaIndex][0];
      pos.col += deltas[deltaIndex][1];
      visited.add(getKey(pos.row, pos.col));
      steps++;
    }

    // go back to scaffold :grimacing:
    pos.row -= deltas[deltaIndex][0];
    pos.col -= deltas[deltaIndex][1];
    steps--;

    path += `${pos.relative},${steps},`;
  }

  return 'i fucked up';
};

const path = asciiSystem(input, false);
// console.log(path);
program = {};
const dust = asciiSystem(input, true);
console.log('Part two:', dust);
