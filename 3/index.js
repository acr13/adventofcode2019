let input = [
  // ['R8', 'U5', 'L5', 'D3'],
  // ['U7' ,'R6', 'D4', 'L4']
];

const parseLine = line => input.push( line.split(',') );

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('3/input.txt')
});
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => run(input));

const key = (x, y) => `${x},${y}`;
const moveTo = (map, line, x, y, total) => {
  const k = key(x, y);
  if (!map[k]) {
    map[k] = { '1': 0, '2': 0, oneSteps: 0, twoSteps: 0, };
  }

  map[k][line]++;

  if (line === 1) {
    map[k].oneSteps = total;
  } else {
    map[k].twoSteps = total;
  }
}

const run = (input) => {
  const map = {};

  let firstIntersectionTotalSteps = 0;

  for (let i = 0; i < input.length; i++) {
    let currentLine = i + 1;
    let line = input[i];
    let position = [0, 0];
    let total = -1;
    
    for (let j = 0; j < line.length; j++) {
      const move = line[j];
      const firstChar = move.charAt(0);
      const len = Number(move.substr(1));

      if (firstChar === 'L') {
        for (let k = 0; k < len; k++) {
          total++;
          moveTo(map, currentLine, position[0], position[1], total);
          position = [ position[0] - 1, position[1] ];
        }
      } else if (firstChar === 'R') {
        for (let k = 0; k < len; k++) {
          total++;
          moveTo(map, currentLine, position[0], position[1], total);
          position = [ position[0] + 1, position[1] ];
        }
      } else if (firstChar === 'U') {
        for (let k = 0; k < len; k++) {
          total++;
          moveTo(map, currentLine, position[0], position[1], total);
          position = [ position[0], position[1] + 1 ];
        }
      } else { // 'D"
        for (let k = 0; k < len; k++) {
          total++;
          moveTo(map, currentLine, position[0], position[1], total);
          position = [ position[0], position[1] - 1 ];
        }
      }
    }
  }

  const keys = Object.keys(map);
  let min = Infinity;
  let intersection = null;

  let totalStepsMin = Infinity;

  for (let i = 0; i < keys.length ; i++) {
    const position = map[keys[i]];
    if (position['1'] && position['2']) {
      const distance = keys[i].split(',').map(Number).reduce((sum, x) => sum + Math.abs(x), 0);
      const totalSteps = position.oneSteps + position.twoSteps;

      if (distance > 0 && totalSteps < totalStepsMin) {
        totalStepsMin = totalSteps;
      }

      if (distance > 0 && distance < min) {
        min = distance;
        intersection = keys[i];
      }
    }
  }

  console.log('Part One:', min);
  console.log('Part Two:', totalStepsMin);
};

