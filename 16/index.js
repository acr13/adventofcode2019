const start = [];
let inputStr = '';

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('16/input.txt')
});
const parseLine = line => {
  inputStr = line;
  for (let i = 0; i < line.length; i++) {
    start.push(line[i]);
  }
};
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log('Part one:', runNPhases(start, 100));
  console.log('Part two:', partTwo(inputStr));
});

const currentNum = (iteration, idx) => {
  if (idx < iteration) {
    return 0;
  }

  const location = idx - iteration;
  const index = location % (4 * (iteration + 1));
  const actualPos = Math.floor(index / (iteration + 1));
  if (actualPos === 0) {
    return 1;
  } else if (actualPos === 2) {
    return -1;
  }

  return 0;
};

const sumRow = (row, iteration) => {
  let sum = 0;

  // we can skip the first *n* numbers since they will be 0
  for (let i = iteration; i < row.length; i++) {
    sum += currentNum(iteration, i) * row[i];
  }

  return sum;
};

const runNPhases = (start, nPhases) => {
  let input = [...start];

  for (let i = 0; i < nPhases; i++) {
    let output = [];

    for (let j = 0; j < input.length; j++) {
      output.push(Math.abs(sumRow(input, j)) % 10);
    }

    input = output;
  }

  return input.slice(0, 8).join('');
};

const partTwo = (line) => {
  let inputStr = '';
  for (let i = 0; i < 10000; i++) {
    inputStr += line;
  }

  const signal = inputStr
    .slice(Number(line.slice(0, 7)))
    .split("")
    .map(Number)
    .reverse();

  for (let phase = 0; phase < 100; phase++) {
    for (let i = 0, prevSum = 0; i < signal.length; i++) {
      prevSum += signal[i];
      signal[i] = prevSum % 10;
    }
  }

  return signal
    .reverse()
    .slice(0, 8)
    .join("");
};
