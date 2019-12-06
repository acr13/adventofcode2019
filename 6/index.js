const planets = {};
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('6/input.txt')
});
const parseLine = line => {
  const [a, b] = line.split(')');
  if (!planets[a]) {
    planets[a] = [];
  }
  if (!planets[b]) {
    planets[b] = [];
  }

  planets[b].push(a);
};
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => partOne(planets));

const getNumOrbits = (planets, planet, thisOrbits, orbitsForPlanets) => {
  if (orbitsForPlanets[planet]) {
    return orbitsForPlanets[planet];
  }

  const directOrbits = thisOrbits.length;

  // plus how many things they orbit
  const indirectOrbits = thisOrbits.reduce((sum, orbit) => {
    return sum + getNumOrbits(planets, orbit, planets[orbit], orbitsForPlanets);
  }, 0);

  return directOrbits + indirectOrbits;
}

const partOne = (planets) => {
  const ps = Object.keys(planets);
  const numPlanets = ps.length;
  let numOrbits = 0;

  // memory hash
  const orbitsForPlanets = {};

  for (let i = 0; i < numPlanets; i++) {
    const planet = ps[i];
    const orbits = planets[ ps[i] ];
    
    if (orbits.length !== 0) {
      const orbitsForPlanet = getNumOrbits(planets, planet, orbits, orbitsForPlanets);
      orbitsForPlanets[planet] = orbitsForPlanet;
      numOrbits += orbitsForPlanet;
    }
  }

  console.log('Part one:', numOrbits);
  const graph = createProperGraph(planets);
  console.log('Part two:', partTwo(graph));
};

const createProperGraph = (planets) => {
  const graph = {};
  const ps = Object.keys(planets);

  for (let i = 0; i < ps.length; i++) {
    const thisPlanet = ps[i];
    // things I orbit
    let siblings = [ ...planets[thisPlanet] ];

    // things that orbit me
    for (let j = 0; j < ps.length; j++) {
      const otherPlanet = ps[j];

      if (otherPlanet !== thisPlanet) {
        if (planets[otherPlanet].includes(thisPlanet)) {
          siblings.push(otherPlanet);
        }
      }
    }
    graph[thisPlanet] = siblings;
  }

  return graph;
};

const doesSantaOrbitThisPlanet = (planets, planet, target) => planets[planet].includes(target);

const minTransfersToPlanet = (planets, planet, targetPlanet, visited) => {
  // we made it
  if (doesSantaOrbitThisPlanet(planets, planet, targetPlanet)) {
    return 1;
  }

  visited[planet] = true;
  const neighbourPlanets = planets[planet];
  const planetsIHaventChecked = neighbourPlanets.filter(p => !visited[p]);
  const movesFromEachPlanetToSanta = planetsIHaventChecked.map(planetsIOrbit =>
    1 + minTransfersToPlanet(planets, planetsIOrbit, targetPlanet, visited)
  );

  return Math.min(...movesFromEachPlanetToSanta);
};

const partTwo = (planets) => {
  const START = 'YOU';
  const TARGET =  '3FH';
  const startingOrbits = planets[START];
  const visited = { [START]: true };
  const movesFromOrbit = startingOrbits.map(o => minTransfersToPlanet(planets, o, TARGET, visited));
  return Math.min(...movesFromOrbit)
};