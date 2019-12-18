const ASTEROID = '#';
const map = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('10/input.txt')
});
const parseLine = line => map.push(line.split(''));
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => run(map));

const run = (map) => {
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
  let bestLocationIndex = -1;
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
      bestLocationIndex = i;
    }
  }

  console.log('Part one:', max);
  
  // from our start position
  const [row, col] = asteroids[bestLocationIndex];
  const degreeSet = new Set();

  // create a hash of
  // { [angle]: [asteroids at this angle...] }
  const asteroidsAroundMe = {};
  for (let i = 0; i < asteroids.length; i++) {
    if (i !== bestLocationIndex) {
      const [row2, col2] = asteroids[i];
      const angle = Math.atan2(row2 - row, col2 - col);
      const degrees = angle * (180 / Math.PI);

      if (!asteroidsAroundMe[degrees]) {
        asteroidsAroundMe[degrees] = [];
      }
      asteroidsAroundMe[degrees].push({
        row: row2,
        col: col2,
        degrees,
        distance: Math.hypot(row - row2, col - col2),
      });

      degreeSet.add(degrees);

      if (asteroidsAroundMe[degrees].length > 1) {
        asteroidsAroundMe[degrees].sort((a, b) => b.distance - a.distance);
      }
    }
  }

  const sortedDegrees = [...degreeSet].sort((a, b) => a - b);
  let currentIndex = sortedDegrees.findIndex(degree => degree === -90);
  let counter = 0;
  let target = null;

  while (counter < 200) {
    let currentDegree = sortedDegrees[currentIndex];

    if (asteroidsAroundMe[currentDegree].length) {
      target = asteroidsAroundMe[currentDegree].pop();
      counter++;
    }

    currentIndex = currentIndex < (sortedDegrees.length - 1) ? currentIndex + 1 : 0;
  }

  console.log('Part two', ((target.col * 100) + target.row));
};
