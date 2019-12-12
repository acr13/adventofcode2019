const ASTEROID = '#';
const map = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('10/input.txt')
});
const parseLine = line => map.push(line.split(''));
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => partOne(map));

const partOne = (map) => {
  const ROWS = map.length;
  const COLS = map[0].length;
  const asteroids = [];
  
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (map[r][c] === ASTEROID) {
        asteroids.push([r, c]);
      }
    }
  }

  let max = -1;
  for (let i = 0; i < asteroids.length; i++) {
    const asteroid = asteroids[i];
    const angles = new Set();
    let visibleAsteroids = 0;

    for (let j = 0; j < asteroids.length; j++) {
      if (i !== j) {
        const otherAsteroid = asteroids[j];
        angles.add(Math.atan2(otherAsteroid[1] - asteroid[1], otherAsteroid[0] - asteroid[0]));
      }
    }

    visibleAsteroids = angles.size;
    if (visibleAsteroids > max) {
      max = visibleAsteroids;
    }
  }

  console.log('Part one:', max);
  return max;
};

