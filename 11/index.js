const END_STATE = 99;
let program = {};
const input = [
  3,8,1005,8,301,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,102,1,8,28,1006,0,98,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,54,2,1001,6,10,1,108,1,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1002,8,1,84,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,105,1006,0,94,2,7,20,10,2,5,7,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,139,1006,0,58,2,1003,16,10,1,6,10,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,172,2,107,12,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,197,1006,0,34,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,102,1,8,223,1006,0,62,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,248,1,7,7,10,1006,0,64,2,1008,5,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,102,1,8,280,101,1,9,9,1007,9,997,10,1005,10,15,99,109,623,104,0,104,1,21102,1,387508351636,1,21101,318,0,0,1106,0,422,21102,1,838480007948,1,21101,0,329,0,1106,0,422,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,0,235190525123,1,21101,0,376,0,1105,1,422,21101,0,106505084123,1,21101,0,387,0,1106,0,422,3,10,104,0,104,0,3,10,104,0,104,0,21101,0,838324605292,1,21102,1,410,0,1105,1,422,21102,709496668940,1,1,21102,421,1,0,1105,1,422,99,109,2,22101,0,-1,1,21102,1,40,2,21101,0,453,3,21102,443,1,0,1106,0,486,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,448,449,464,4,0,1001,448,1,448,108,4,448,10,1006,10,480,1102,1,0,448,109,-2,2106,0,0,0,109,4,2101,0,-1,485,1207,-3,0,10,1006,10,503,21102,0,1,-3,22102,1,-3,1,21201,-2,0,2,21101,1,0,3,21102,1,522,0,1106,0,527,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,550,2207,-4,-2,10,1006,10,550,21202,-4,1,-4,1106,0,618,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21102,569,1,0,1106,0,527,21202,1,1,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,588,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,610,22101,0,-1,1,21101,0,610,0,106,0,485,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0
];

let relativeBase = 0;

const getKey = (position) => `${position[0]},${position[1]}`;
const getColor = (panels, position) => panels[getKey(position)] || 0;
const getValue = (pointer) => program[pointer] ? program[pointer] : 0;
const getIndex = (program, mode, pointer) => {
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
}
const getNewDirection = (cur, turnValue) => {
  // GO RIGHT
  if (turnValue === 1) {
    if (cur === 'U') {
      return 'R';
    } else if (cur === 'R') {
      return 'D';
    } else if (cur === 'D') {
      return 'L';
    } else {
      return 'U';
    }
  } else { // GO LEFT
    if (cur === 'U') {
      return 'L';
    } else if (cur === 'R') {
      return 'U';
    } else if (cur === 'D') {
      return 'R';
    } else {
      return 'D';
    }
  }
}
const move = (current, pos) => {
  if (current === 'U') {
    return [pos[0] + 1, pos[1]];
  } else if (current === 'R') {
    return [pos[0], pos[1] + 1];
  } else if (current === 'D') {
    return [pos[0] - 1, pos[1]];
  } else { // current === 'L'
    return [pos[0], pos[1] - 1];
  }
}

const paint = (input, s, panels, position) => {
  for (let i = 0; i < input.length; i++) {
    program[i] = input[i];
  }

  let pointer = 0;
  let currentPosition = position;
  let currentDirection = 'U';
  let hasPainted = false;

  while (program[pointer] !== END_STATE) {
    let opcode = program[pointer];

    // get our opcode into a list of parts
    let parts = opcode.toString().split('').map(Number);
    while (parts.length < 5) {
      parts = [0, ...parts];
    }
    let code = parts[4];

    // get our parameters
    let x = getIndex(program, parts[2], pointer + 1);
    let y = getIndex(program, parts[1], pointer + 2);
    let z = getIndex(program, parts[0], pointer + 3);

    let jumped = false;

    if (code === 1) {
      program[z] = getValue(x) + getValue(y);
    } else if (code === 2) {
      program[z] = getValue(x) * getValue(y);
    } else if (code === 3) {
      // INPUT CODE
      program[x] = getColor(panels, currentPosition)
    } else if (code === 4) {

      // new stuff
      if (!hasPainted) {
        const newColor = program[x];
        panels[getKey(currentPosition)] = newColor;
        hasPainted = true;
      } else {
        const turnValue = program[x];
        currentDirection = getNewDirection(currentDirection, turnValue);
        currentPosition = move(currentDirection, currentPosition);
        hasPainted = false;
      }

      // old
      // console.log('CODE:', program[x]);
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

  return panels;
}

let position = [0, 0];
let panels = { [getKey(position)]: 0 };

panels = paint(input, 0, panels, position);
console.log('Part one:', Object.keys(panels).length);

program = {};
position = [0, 0];
panels = { [getKey(position)]: 1 };
panels = paint(input, 1, panels, position);
const keys = Object.keys(panels)
  .map(key => {
    const [x, y] = key.split(',');
    return [Number(x), Number(y)];
  });

let maxX = -1;
let maxY = -1;
let minX = Infinity;
let minY = Infinity;

for (let i = 0; i < keys.length; i++) {
  const k = keys[i];
  if (k[0] > maxY) { maxY = k[0]; }
  if (k[1] > maxX) { maxX = k[1]; }
  if (k[0] < minY) { minY = k[0]; }
  if (k[1] < minX) { minX = k[1]; }
}

console.log('Par two:');
for (let i = minX; i <= maxX; i++) {
  let line = '';
  for (let j = minY; j <= maxY; j++) {
    const color = getColor(panels, [j, i]);
    // console.log(color);
    if (color === 1) {
      line += '#';
    } else {
      line += ' ';
    }
  }
  console.log(line);
}
