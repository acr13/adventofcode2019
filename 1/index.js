let input = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('input.txt')
});
const parseLine = line => input.push(Number(line));
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => getFuel(input));

const testInput = [
  12,
  14,
  1969,
  100756,
];

const getFuelRecursive = (fuel, total) => {
  const thisFuel = Math.floor(fuel / 3) - 2;

  if (thisFuel <= 0) {
    return total;
  }
  
  return getFuelRecursive(thisFuel, total + thisFuel);
};

const getFuel = (input) => {
  let sum = 0;
  let recursiveSum = 0;

  for (let i = 0; i < input.length; i++) {
    sum += Math.floor(input[i] / 3) - 2;
    recursiveSum += getFuelRecursive(input[i], 0);
  }

  console.log('Part one', sum);
  console.log('Part two', recursiveSum);
  return sum;
};
