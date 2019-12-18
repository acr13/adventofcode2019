const planets = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('12/input.txt')
});
const parseLine = line => {
  const [x, y, z] = line
    .replace(/=|<|>|x|y|z/g, '')
    .replace(' ', '')
    .split(',')
    .map(Number);
  planets.push({
    pos: { x, y, z },
    vel: { x: 0, y: 0, z: 0 },
  });
};
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log('Part one:', partOne(planets));
  console.log('Part two:', partTwo(planets));
});

const getVelDelta = (planets) => {
  const velDeltas = [];

  for (let j = 0; j < planets.length; j++) {
    const currentPlanet = planets[j];
    const { pos: currentPosition } = currentPlanet;
    let velDelta = { x: 0, y: 0, z: 0 };

    // 1. calculate gravity
    // for each planet, look at each other planet
    for (let k = 0; k < planets.length; k++) {
      if (j !== k) {
        const { pos: otherPlanetPosition } = planets[k];
        if (currentPosition.x > otherPlanetPosition.x) {
          velDelta.x--;
        } else if (currentPosition.x < otherPlanetPosition.x) {
          velDelta.x++;
        }

        if (currentPosition.y > otherPlanetPosition.y) {
          velDelta.y--;
        } else if (currentPosition.y < otherPlanetPosition.y) {
          velDelta.y++;
        }

        if (currentPosition.z > otherPlanetPosition.z) {
          velDelta.z--;
        } else if (currentPosition.z < otherPlanetPosition.z) {
          velDelta.z++;
        }
      }
    }

    // 2. Save vel
    velDeltas.push([velDelta.x, velDelta.y, velDelta.z]);
  }

  return velDeltas;
}

const partOne = (planets) => {
  const STEPS = 1000;
  
  for (let i = 0; i < STEPS; i++) {
    const velDeltas = getVelDelta(planets);
    
    for (let i = 0; i < velDeltas.length; i++) {
      const planet = planets[i];
      planet.vel.x += velDeltas[i][0];
      planet.vel.y += velDeltas[i][1];
      planet.vel.z += velDeltas[i][2];
    }

    for (let i = 0; i < planets.length; i++) {
      const planet = planets[i];
      planet.pos.x += planet.vel.x;
      planet.pos.y += planet.vel.y;
      planet.pos.z += planet.vel.z;
    }
  }

  // 4. Energy
  const energies = [];
  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    const pot = Math.abs(planet.pos.x) + Math.abs(planet.pos.y) + Math.abs(planet.pos.z);
    const kin = Math.abs(planet.vel.x) + Math.abs(planet.vel.y) + Math.abs(planet.vel.z);
    energies.push(pot * kin);
  }

  const totalEnergy = energies.reduce((sum, val) => sum + val , 0);
  return totalEnergy;
};

const getPlanetAxisKey = (planet, axis) => [planet.pos[axis], planet.vel[axis]].join(',');
const getPlanetsAxisKey = (planets, axis) => planets.map(planet => getPlanetAxisKey(planet, axis)).join('.')
const getLargestDivisor = (a, b) => {
  let [c, d] = [a, b];
  while (d > 0) {
    const t = d;
    d = c % d;
    c = t;
  }
  return c;
};
const getMinCommonMultiple = (a, b) => (a * b) / getLargestDivisor(a, b);

const partTwo = (planets) => {
  // run the simulation for each _axis_,
  // stop when we see a repeat state
  const axisRepeats = [];
  const axis = ['x', 'y', 'z'];

  for (let i = 0; i < axis.length; i++) {
    const axi = axis[i];
    const states = new Set();
    let key = getPlanetsAxisKey(planets, axi);
    let count = 0;
    

    do {
      states.add(key);

      const velDeltas = getVelDelta(planets);
    
      for (let i = 0; i < velDeltas.length; i++) {
        const planet = planets[i];
        planet.vel.x += velDeltas[i][0];
        planet.vel.y += velDeltas[i][1];
        planet.vel.z += velDeltas[i][2];
      }

      for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        planet.pos.x += planet.vel.x;
        planet.pos.y += planet.vel.y;
        planet.pos.z += planet.vel.z;
      }

      key = getPlanetsAxisKey(planets, axi);
      count++;
    } while (!states.has(key));

    axisRepeats.push(count);
  }

  const minCommonMultiple = axisRepeats.reduce(getMinCommonMultiple);
  return minCommonMultiple;
};