const END_STATE = 99;
const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,5,23,1,6,23,27,1,27,5,31,2,31,10,35,2,35,6,39,1,39,5,43,2,43,9,47,1,47,6,51,1,13,51,55,2,9,55,59,1,59,13,63,1,6,63,67,2,67,10,71,1,9,71,75,2,75,6,79,1,79,5,83,1,83,5,87,2,9,87,91,2,9,91,95,1,95,10,99,1,9,99,103,2,103,6,107,2,9,107,111,1,111,5,115,2,6,115,119,1,5,119,123,1,123,2,127,1,127,9,0,99,2,0,14,0];
const program = {};

const runProgram = (input, noun, verb) => {
  for (let i = 0; i < input.length; i++) {
    program[i] = input[i];
  }

  let pointer = 0;

  program[1] = noun;
  program[2] = verb;

  while (program[pointer] !== END_STATE) {
    let x = program[program[pointer + 1]];
    let y = program[program[pointer + 2]];

    if (program[pointer] === 1) {  
      program[program[pointer + 3]] = x + y;
    } else if (program[pointer] === 2) {
      program[program[pointer + 3]] = x * y;
    } else {
      console.log('fail at pointer', pointer);
      return;
    }
    pointer += 4;
  }

  return program[0];
}

console.log('Part one', runProgram(input, 12, 2));

const partTwo = () => {
  const TARGET = 19690720;
  let noun = 78;
  let verb = 70;

  let i = 0;

  while (i < 100) {
    const output =  runProgram(input, noun, verb);

    if (output < TARGET) {
      verb++;
    } else if (output > TARGET) {
      verb--;
    } else {
      return 100 * noun + verb;
    }

    i++;
  }
};

console.log('Part two', partTwo());