const recipes = {};
const FUEL = 'FUEL';
const ORE = 'ORE';

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('14/input.txt')
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
  console.log('Part two:', partTwo(recipes));
});

// primitive recipies only require ORE.
// eq 7A is primitive because:
// 9 ORE => 2 A
const isPrimitive = recipe =>
  recipes[recipe.name].needs.length === 1 && recipes[recipe.name].needs[0].name === ORE;
const allPrimitiveTypes = arr => arr.every(isPrimitive);
  
const getNumberOfOreToMakeFuel = (target, qty) => {
  const surplus = {};
  let recipeForFuel = recipes[target].needs.map(neededRecipe => ({
    ...neededRecipe,
    value: qty * neededRecipe.value,
  }));

  // break down each recipe until we have a primitive one
  while (!allPrimitiveTypes(recipeForFuel)) {
    recipeForFuel = recipeForFuel.map(recipe => {
      if (!isPrimitive(recipe)) {
        const existing = surplus[recipe.name] || 0;
        const multiplier = Math.ceil(Math.max((recipe.value - existing), 0) / +recipes[recipe.name].value);
        const extra = (+recipes[recipe.name].value * multiplier) - (recipe.value - existing);
        surplus[recipe.name] = extra;

        return recipes[recipe.name].needs.map(neededRecipe => ({
          ...neededRecipe,
          value: multiplier * neededRecipe.value
        }));
      };
        
      return recipe;
    });
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
      return Math.ceil(finalFormula[key].value / Number(recipe.value)) * recipe.needs[0].value;
    })
    .reduce((sum, val) => sum + val, 0);
  return ore;
};

const partOne = (recipes) => getNumberOfOreToMakeFuel(FUEL, 1);

const partTwo = (recipes) => {
  const TOTAL_ORE = 1000000000000;
  let maxFuel = -1;
  for (let i = 3685555; i < 3700000; i++) {
    const ore = getNumberOfOreToMakeFuel(FUEL, i);
    if (ore <= TOTAL_ORE) {
      maxFuel = i;
    } else {
      break
    }
  }
  return maxFuel;
}