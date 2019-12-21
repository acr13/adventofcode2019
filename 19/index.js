// IntCode consts
const END_STATE = 99;
let program = {};
const input = [
  109,424,203,1,21101,11,0,0,1106,0,282,21101,18,0,0,1106,0,259,1202,1,1,221,203,1,21102,31,1,0,1105,1,282,21101,0,38,0,1106,0,259,21002,23,1,2,22102,1,1,3,21102,1,1,1,21102,57,1,0,1106,0,303,2102,1,1,222,21002,221,1,3,20102,1,221,2,21102,1,259,1,21102,1,80,0,1105,1,225,21102,105,1,2,21102,91,1,0,1105,1,303,1202,1,1,223,20102,1,222,4,21102,259,1,3,21101,225,0,2,21101,225,0,1,21102,118,1,0,1106,0,225,20101,0,222,3,21101,157,0,2,21102,133,1,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,1,148,0,1105,1,259,2101,0,1,223,20101,0,221,4,20101,0,222,3,21102,21,1,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21102,195,1,0,105,1,108,20207,1,223,2,20101,0,23,1,21102,-1,1,3,21101,0,214,0,1106,0,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1201,-4,0,249,21202,-3,1,1,21202,-2,1,2,22102,1,-1,3,21101,0,250,0,1106,0,225,22101,0,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2105,1,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22102,1,-2,-2,109,-3,2106,0,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21201,-2,0,3,21101,0,343,0,1105,1,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,21201,-4,0,1,21102,384,1,0,1106,0,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,21201,1,0,-4,109,-5,2105,1,0
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

// Day 19

const intcode = (input, x, y) => {
  for (let i = 0; i < input.length; i++) {
    program[i] = input[i];
  }

  let pointer = 0;
  let relativeBase = 0;
  let output = -1;
  let pos = [x, y];
  let idx = 0;

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
      // console.log('INPUT', pos[idx]);
      program[x] = pos[idx];
      idx++;
    } else if (code === 4) {
      output = program[x];
      // console.log('OUTPUT', output);
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

  return output;
};

// const GRID_MAX = 500;
// let c = 0;
// for (let i = 0; i < GRID_MAX; i++) {
//   for (let j = 0; j < GRID_MAX; j++) {
//     const o = intcode(input, i, j);
//     if (o === 1) {
//       c++;
//     }
//   }
// }
// console.log('Part one:', c);

const getValueAtPosition = (x, y) => intcode(input, x, y);
const getLastBeamAtLine = (y, previousX) => {
  let current;
  let next;
  let i = -1;
  do {
    i++;
    current = getValueAtPosition(previousX + i, y);
    next = getValueAtPosition(previousX + i + 1, y);
  } while (!(current === 1 && next === 0));
  return previousX + i;
};

let prevX = 945;
let prevY = 500;

// if we can find the last beam of each line, (top right corner of the square)
// the bottom left corner of the square (back 99, down 99) and see if its a 1
while (true) {
  prevY++;
  prevX = getLastBeamAtLine(prevY, prevX);
  if (getValueAtPosition(prevX - 99, prevY + 99) === 1) {
    console.log('Part two:', ((prevX - 99) * 10000) + prevY);
    return;
  }
}
