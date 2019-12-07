var Combinatorics = require('js-combinatorics');

const END_STATE = 99;
const input = [
  // 3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0
  // 3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0
  // 3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0

  // 3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5
  // 3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10
  // real input - day 7
  3,8,1001,8,10,8,105,1,0,0,21,38,63,80,105,118,199,280,361,442,99999,3,9,102,5,9,9,1001,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,4,9,102,4,9,9,101,4,9,9,102,2,9,9,101,2,9,9,4,9,99,3,9,1001,9,5,9,102,4,9,9,1001,9,4,9,4,9,99,3,9,101,3,9,9,1002,9,5,9,101,3,9,9,102,5,9,9,101,3,9,9,4,9,99,3,9,1002,9,2,9,1001,9,4,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,99
];

const runProgram = (input, phaseSetting, inputValue, memory) => {
  let program = {};
  let pointer = 0;
  let inputsGiven = 0;

  if (!memory) {
    program = {};
    for (let i = 0; i < input.length; i++) {
      program[i] = input[i];
    }  
  } else {
    program = memory.memory;
    pointer = memory.pointer;
    inputsGiven = 1; // skip phase setting
  }

  while (program[pointer] !== END_STATE) {
    let opcode = program[pointer];

    // get our opcode into a list of parts
    let parts = opcode.toString().split('').map(Number);
    while (parts.length < 5) {
      parts = [0, ...parts];
    }
    let code = parts[4];

    // get our parameters
    let x = program[program[pointer + 1]];
    if (parts[2] === 1) {
      x = program[pointer + 1];
    }
    let y = program[program[pointer + 2]];
    if (parts[1] === 1) {
      y = program[pointer + 2];
    }

    let z = program[pointer + 3];

    let jumped = false;

    if (code === 1) {  
      program[program[pointer + 3]] = x + y;
    } else if (code === 2) {
      program[program[pointer + 3]] = x * y;
    } else if (code === 3) {
      // INPUT CODE
      if (inputsGiven === 0) {
        program[program[pointer + 1]] = phaseSetting;
      } else {
        program[program[pointer + 1]] = inputValue;
      }
      inputsGiven++;
    } else if (code === 4) {
      return {
        memory: program,
        output: program[program[pointer + 1]],
        pointer: pointer += 2,
      };
    } else if (code === 5) {
      if (x !== 0) {
        jumped = true;
        pointer = y;
      }
    } else if (code === 6) {
      if (x === 0) {
        jumped = true;
        pointer = y;
      }
    } else if (code === 7) {
      if (x < y) {
        program[z] = 1;
      } else {
        program[z] = 0;
      }
    } else if (code === 8) {
      if (x === y) {
        program[z] = 1;
      } else {
        program[z] = 0;
      }
    } else {
      console.log('fail at pointer', pointer);
      return;
    }

    if (!jumped) {
      if (code === 1 || code === 2) {
        pointer += 4;
      } else if (code === 3 || code === 4) {
        pointer += 2;
      } else if (code === 5 || code === 6) {
        pointer += 3;
      } else if (code === 7 || code === 8) {
        pointer += 4;
      }
    }
  }

  // console.log('HALTING');
  return {
    memory: program,
    output: program[program[pointer + 1]],
    pointer: pointer += 2,
    halt: true,
  }
}

// Part One
// const permutations = Combinatorics.permutation([0,1,2,3,4]).toArray();
// let max = -1;
// for (let i = 0; i < permutations.length; i++) {
//   let sequence = permutations[i];
//   let total = 0;
//   let outputOfPrev = 0;
//   for (let j = 0; j < sequence.length; j++) {
//     outputOfPrev = runProgram(input, sequence[j], outputOfPrev);

//     if (j === 4) {
//       total = outputOfPrev;
//     }
//   }
//   if (total > max) {
//     max = total;
//   }
// }

// console.log('Part One:', max);

// Part Two
const permutations = Combinatorics.permutation([5,6,7,8,9]).toArray();
let max = -1;
let total = 0;
let bestPerm = [];

for (let i = 0; i < permutations.length; i++) {
  const cache = {
    0: {},
    1: {},
    2: {},
    3: {},
    4: {},
  };

  let sequence = permutations[i];
  total = 0;
  let outputOfPrev = 0;
  let currentAmp = 0;

  for (let j = 0; j < sequence.length; j++) {
    let output = runProgram(input, sequence[j], outputOfPrev);

    cache[currentAmp] = {
      memory: output.memory,
      pointer: output.pointer,
      output: output.output,
    };
    outputOfPrev = output.output;

    currentAmp++;
  }

  currentAmp = 0;

  // feedback loop
  while (true) {
    let output = runProgram(input, -1, outputOfPrev, cache[currentAmp]);

    if (currentAmp === 4 && output.halt) {
      total = cache[currentAmp].output;
      break;
    }

    cache[currentAmp] = {
      memory: output.memory,
      pointer: output.pointer,
      output: output.output,
    };
    outputOfPrev = output.output;

    currentAmp++;
    if (currentAmp === 5) { currentAmp = 0; }
  }

  if (total > max) {
    max = total;
    bestPerm = sequence;
  }
}

console.log('Part 2', max, bestPerm);