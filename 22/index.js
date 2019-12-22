const NUM_CARDS = 10007;
const cards = [...Array(NUM_CARDS).keys()];
const steps = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('22/input.txt')
});
const parseLine = line => {
  const parts = line.split(' ');

  if (parts[2] === 'increment') {
    steps.push(['increment', Number(parts[3])]);
  } else if (parts[2] === 'new') {
    steps.push(['new']);
  } else if (parts[0] === 'cut') {
    steps.push(['cut', Number(parts[1])]);
  } else {
    console.log('wtf is this', parts);
  }
};
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => {
  console.log('Part one:', partOne(cards, steps));
  console.log('Part two:', partTwo(steps));
});

const increment = (cards, n) => {
  let deck = [];
  let i = 0;
  let idx = 0;

  while (i < cards.length) {
    deck[idx % cards.length] = cards[i];
    idx += n;
    i++;
  }

  return deck;
};

const cut = (cards, n) =>
  n >= 0 ?
    [...cards.slice(n), ...cards.slice(0, n)] :
    [...cards.slice(cards.length - Math.abs(n)), ...cards.slice(0, cards.length - Math.abs(n))];

const partOne = (cards, steps) => {
  let deck = [...cards];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (step[0] === 'increment') {
      deck = increment(deck, step[1]);
    } else if (step[0] === 'new') {
      deck.reverse();
    } else if (step[0] === 'cut') {
      deck = cut(deck, step[1]);
    }
  }

  return deck.findIndex(x => x === 2019);
};

const partTwo = (steps) => {
  return 'go fuck yourself';
};
