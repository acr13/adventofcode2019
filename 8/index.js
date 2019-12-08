const image = [];
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('8/input.txt')
});
const parseLine = line => {
  for (let i = 0; i < line.length; i++) {
    image.push(line[i]);
  }
};
lineReader.on('line', line => parseLine(line));
lineReader.on('close', () => run(image));

const run = (image) => {
  const layers = partOne(image);

  console.log('Part one:', layers.checksum); 
  partTwo(layers.layers);
};

const getChecksum = (layer) => {
  let zeros = 0;
  let ones = 0;
  let twos = 0;

  for (let i = 0; i < layer.length; i++) {
    if (layer[i] === 0) {
      zeros++;
    } else if (layer[i] === 1) {
      ones++;
    } else if (layer[i] === 2) {
      twos++;
    }
  }
  
  return {
    zeros,
    checksum: ones * twos,
  }
};

const partOne = (image) => {
  // 15000 - 25 x 6 (x 100 layers)
  const layers = [];
  const layerLength = 150;

  let minZeros = Infinity;
  let checksum = -1;
  let i = 0;
  let currentLayer = 0;
  while (currentLayer < 100) {
    if (!layers[currentLayer]) {
      layers[currentLayer] = [];
    }

    layers[currentLayer].push(Number(image[i]));

    if (layers[currentLayer].length === layerLength) {
      const layerChecksum = getChecksum(layers[currentLayer]);

      if (layerChecksum.zeros < minZeros) {
        minZeros = layerChecksum.zeros;
        checksum = layerChecksum.checksum;
      }

      currentLayer++;
    }
    i++;
  }

  return { layers, checksum };
};

const partTwo = (layers) => {
  const image = [];
  const IMAGE_LENGTH = layers[0].length;

  for (let i = 0; i < IMAGE_LENGTH; i++) {
    let currentLayer = 0;
    let currentPixel = layers[currentLayer][i]

    while (currentPixel === 2) {
      currentLayer++;
      currentPixel = layers[currentLayer][i];
    }

    image.push(currentPixel);
  }

  console.log('Part two:')

  index = 0;
  for (let i = 0; i < 6; i++) {
    let line = '';

    for (let j = 0; j < 25; j++) {
      if (image[index] === 0) {
        line += ' ';
      } else {
        line += 'X'; // image[index];
      }
      index++;
    }
    console.log(line);
  }
}
