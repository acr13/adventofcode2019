const hasAtLeastOneGroupOfTwoDigits = (number) => {
  const s = String(number);
  const l = s.length;
  const map = {};

  for (let i = 0; i < l; i++) {
    if (!map[s[i]]) {
      map[s[i]] = 0;
    }

    map[s[i]]++;
  }

  const keys = Object.keys(map);
  return keys.some(key => map[key] === 2);
}

const hasTwoAdjacentDigits = (number) => {
  const s = String(number);
  const l = s.length;

  for (let i = 0; i < (l - 1); i++) {
    if (s[i] === s[i + 1]) {
      return true;
    }
  }

  return false;
};

const isNeverDecreasing = (number) => {
  const s = String(number);
  const l = s.length;

  for (let i = 0; i < (l - 1); i++) {
    const a = Number(s[i]);
    const b = Number(s[i + 1]);

    if (a > b) {
      return false;
    }
  }

  return true;
};

const isValid = (number) => hasTwoAdjacentDigits(number) && isNeverDecreasing(number) && hasAtLeastOneGroupOfTwoDigits(number);
const nextNumber = (number) => number + 1;


const start = 246515;
const stop = 739105;
let current = start + 1;
let numValidPasswords = 0;

while (current < stop) {
  if (isValid(current)) {
    numValidPasswords++;
  }
  current = nextNumber(current);
}

// console.log('Part one:', numValidPasswords);
console.log('Part two:', numValidPasswords);
