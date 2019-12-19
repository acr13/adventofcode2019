const recipes = {};
const FUEL = 'FUEL';
const ORE = 'ORE';

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('14/test2.txt')
});
const parseLine = line => {
  const parts = line.split(' => ');
  const needs = parts[0]
    .split(', ')
    .map(x => x.split(' '))
    .map(y => ({ value: parseInt(y[0]), name: y[1] }));
  const [value, target] = parts[parts.length - 1].split(' ');
  recipes[target] = { value, needs };
};
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log('Part one:', partOne(recipes));
});

const isPrimitive = recipe =>
  recipes[recipe.name].needs.length === 1 && recipes[recipe.name].needs[0].name === ORE;
const allPrimitiveTypes = arr => arr.every(isPrimitive);
  

const partOne = (recipes) => {
  const FUEL = 'FUEL';
  let recipeForFuel = recipes[FUEL].needs;

  while (!allPrimitiveTypes(recipeForFuel)) {
    recipeForFuel = recipeForFuel.map(recipe =>
      !isPrimitive(recipe) ?
        recipes[recipe.name].needs : recipe // TODO - multiple new array values by value
    );
    recipeForFuel = [].concat(...recipeForFuel);
  }

  // group together similar values
  const finalFormula = {};
  for (let i = 0; i < recipeForFuel.length; i++) {
    const recipe = recipeForFuel[i];
    if (!finalFormula[recipe.name]) {
      finalFormula[recipe.name] = { value: 0 };
    }
    finalFormula[recipe.name].value += recipe.value;
  }
  
  const ore = Object.keys(finalFormula)
    .map(key => {
      const recipe = recipes[key];
      // console.log(recipe);
      // console.log(recipe.value);
      return Math.ceil(finalFormula[key].value / Number(recipe.value)) * recipe.needs[0].value;
    })
    .reduce((sum, val) => sum + val, 0);
  return ore;
};