// IntCode consts
const END_STATE = 99;
let program = {};
const input = [
  109,2050,21101,0,966,1,21102,1,13,0,1105,1,1378,21102,1,20,0,1105,1,1337,21101,0,27,0,1105,1,1279,1208,1,65,748,1005,748,73,1208,1,79,748,1005,748,110,1208,1,78,748,1005,748,132,1208,1,87,748,1005,748,169,1208,1,82,748,1005,748,239,21102,1,1041,1,21102,1,73,0,1105,1,1421,21101,0,78,1,21102,1041,1,2,21102,1,88,0,1106,0,1301,21102,1,68,1,21101,1041,0,2,21101,103,0,0,1105,1,1301,1101,1,0,750,1105,1,298,21102,1,82,1,21102,1041,1,2,21102,125,1,0,1105,1,1301,1101,0,2,750,1106,0,298,21101,79,0,1,21102,1041,1,2,21101,0,147,0,1106,0,1301,21101,0,84,1,21101,1041,0,2,21102,1,162,0,1105,1,1301,1101,3,0,750,1105,1,298,21101,65,0,1,21101,0,1041,2,21101,184,0,0,1106,0,1301,21101,76,0,1,21102,1,1041,2,21101,0,199,0,1105,1,1301,21101,75,0,1,21101,1041,0,2,21101,0,214,0,1106,0,1301,21102,221,1,0,1106,0,1337,21101,0,10,1,21102,1,1041,2,21101,236,0,0,1106,0,1301,1105,1,553,21101,85,0,1,21102,1,1041,2,21101,0,254,0,1105,1,1301,21101,78,0,1,21102,1,1041,2,21102,1,269,0,1105,1,1301,21101,276,0,0,1105,1,1337,21101,0,10,1,21101,0,1041,2,21101,0,291,0,1106,0,1301,1101,0,1,755,1105,1,553,21102,1,32,1,21101,0,1041,2,21102,1,313,0,1105,1,1301,21102,1,320,0,1105,1,1337,21102,327,1,0,1105,1,1279,2101,0,1,749,21102,1,65,2,21101,0,73,3,21101,0,346,0,1106,0,1889,1206,1,367,1007,749,69,748,1005,748,360,1102,1,1,756,1001,749,-64,751,1106,0,406,1008,749,74,748,1006,748,381,1102,1,-1,751,1105,1,406,1008,749,84,748,1006,748,395,1101,0,-2,751,1105,1,406,21101,1100,0,1,21101,0,406,0,1105,1,1421,21102,1,32,1,21101,0,1100,2,21101,0,421,0,1105,1,1301,21102,1,428,0,1105,1,1337,21101,0,435,0,1106,0,1279,2101,0,1,749,1008,749,74,748,1006,748,453,1102,-1,1,752,1106,0,478,1008,749,84,748,1006,748,467,1102,-2,1,752,1105,1,478,21102,1,1168,1,21102,478,1,0,1106,0,1421,21102,485,1,0,1106,0,1337,21101,10,0,1,21101,1168,0,2,21101,0,500,0,1105,1,1301,1007,920,15,748,1005,748,518,21101,0,1209,1,21101,518,0,0,1105,1,1421,1002,920,3,529,1001,529,921,529,1002,750,1,0,1001,529,1,537,102,1,751,0,1001,537,1,545,101,0,752,0,1001,920,1,920,1105,1,13,1005,755,577,1006,756,570,21102,1100,1,1,21102,1,570,0,1105,1,1421,21102,987,1,1,1105,1,581,21102,1001,1,1,21102,588,1,0,1105,1,1378,1101,0,758,593,1001,0,0,753,1006,753,654,20102,1,753,1,21101,0,610,0,1105,1,667,21101,0,0,1,21101,0,621,0,1105,1,1463,1205,1,647,21102,1015,1,1,21101,635,0,0,1105,1,1378,21101,0,1,1,21102,646,1,0,1106,0,1463,99,1001,593,1,593,1106,0,592,1006,755,664,1102,1,0,755,1106,0,647,4,754,99,109,2,1102,1,726,757,21202,-1,1,1,21102,1,9,2,21102,697,1,3,21101,0,692,0,1105,1,1913,109,-2,2105,1,0,109,2,102,1,757,706,1201,-1,0,0,1001,757,1,757,109,-2,2106,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,255,63,159,191,223,95,127,0,168,229,227,34,138,226,117,51,177,185,92,62,220,125,235,239,110,199,121,100,173,154,79,172,200,155,116,249,184,39,53,243,251,118,86,76,216,156,55,152,78,231,202,175,201,111,232,35,228,107,213,158,77,85,189,169,120,123,196,230,57,219,113,186,98,119,99,221,187,217,214,108,163,102,178,246,136,218,252,54,56,84,162,166,250,58,106,183,190,141,109,50,247,245,115,137,59,122,42,188,203,206,126,254,43,241,103,171,153,253,142,157,167,234,69,248,38,207,70,212,215,71,242,236,204,46,94,179,139,61,181,205,198,170,114,47,174,124,60,238,197,49,68,93,87,244,182,222,101,233,237,140,143,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,73,110,112,117,116,32,105,110,115,116,114,117,99,116,105,111,110,115,58,10,13,10,87,97,108,107,105,110,103,46,46,46,10,10,13,10,82,117,110,110,105,110,103,46,46,46,10,10,25,10,68,105,100,110,39,116,32,109,97,107,101,32,105,116,32,97,99,114,111,115,115,58,10,10,58,73,110,118,97,108,105,100,32,111,112,101,114,97,116,105,111,110,59,32,101,120,112,101,99,116,101,100,32,115,111,109,101,116,104,105,110,103,32,108,105,107,101,32,65,78,68,44,32,79,82,44,32,111,114,32,78,79,84,67,73,110,118,97,108,105,100,32,102,105,114,115,116,32,97,114,103,117,109,101,110,116,59,32,101,120,112,101,99,116,101,100,32,115,111,109,101,116,104,105,110,103,32,108,105,107,101,32,65,44,32,66,44,32,67,44,32,68,44,32,74,44,32,111,114,32,84,40,73,110,118,97,108,105,100,32,115,101,99,111,110,100,32,97,114,103,117,109,101,110,116,59,32,101,120,112,101,99,116,101,100,32,74,32,111,114,32,84,52,79,117,116,32,111,102,32,109,101,109,111,114,121,59,32,97,116,32,109,111,115,116,32,49,53,32,105,110,115,116,114,117,99,116,105,111,110,115,32,99,97,110,32,98,101,32,115,116,111,114,101,100,0,109,1,1005,1262,1270,3,1262,21001,1262,0,0,109,-1,2106,0,0,109,1,21102,1,1288,0,1106,0,1263,21001,1262,0,0,1101,0,0,1262,109,-1,2105,1,0,109,5,21101,1310,0,0,1105,1,1279,21201,1,0,-2,22208,-2,-4,-1,1205,-1,1332,21202,-3,1,1,21101,0,1332,0,1105,1,1421,109,-5,2105,1,0,109,2,21101,1346,0,0,1106,0,1263,21208,1,32,-1,1205,-1,1363,21208,1,9,-1,1205,-1,1363,1105,1,1373,21102,1370,1,0,1105,1,1279,1105,1,1339,109,-2,2105,1,0,109,5,2101,0,-4,1386,20101,0,0,-2,22101,1,-4,-4,21102,0,1,-3,22208,-3,-2,-1,1205,-1,1416,2201,-4,-3,1408,4,0,21201,-3,1,-3,1105,1,1396,109,-5,2105,1,0,109,2,104,10,21202,-1,1,1,21101,0,1436,0,1106,0,1378,104,10,99,109,-2,2106,0,0,109,3,20002,593,753,-1,22202,-1,-2,-1,201,-1,754,754,109,-3,2106,0,0,109,10,21102,5,1,-5,21101,1,0,-4,21101,0,0,-3,1206,-9,1555,21101,3,0,-6,21101,5,0,-7,22208,-7,-5,-8,1206,-8,1507,22208,-6,-4,-8,1206,-8,1507,104,64,1105,1,1529,1205,-6,1527,1201,-7,716,1515,21002,0,-11,-8,21201,-8,46,-8,204,-8,1106,0,1529,104,46,21201,-7,1,-7,21207,-7,22,-8,1205,-8,1488,104,10,21201,-6,-1,-6,21207,-6,0,-8,1206,-8,1484,104,10,21207,-4,1,-8,1206,-8,1569,21101,0,0,-9,1106,0,1689,21208,-5,21,-8,1206,-8,1583,21101,0,1,-9,1106,0,1689,1201,-5,716,1589,20102,1,0,-2,21208,-4,1,-1,22202,-2,-1,-1,1205,-2,1613,21201,-5,0,1,21102,1613,1,0,1105,1,1444,1206,-1,1634,22102,1,-5,1,21102,1,1627,0,1105,1,1694,1206,1,1634,21102,1,2,-3,22107,1,-4,-8,22201,-1,-8,-8,1206,-8,1649,21201,-5,1,-5,1206,-3,1663,21201,-3,-1,-3,21201,-4,1,-4,1105,1,1667,21201,-4,-1,-4,21208,-4,0,-1,1201,-5,716,1676,22002,0,-1,-1,1206,-1,1686,21102,1,1,-4,1106,0,1477,109,-10,2105,1,0,109,11,21102,0,1,-6,21101,0,0,-8,21101,0,0,-7,20208,-6,920,-9,1205,-9,1880,21202,-6,3,-9,1201,-9,921,1725,20101,0,0,-5,1001,1725,1,1733,20102,1,0,-4,21202,-4,1,1,21102,1,1,2,21102,9,1,3,21101,0,1754,0,1106,0,1889,1206,1,1772,2201,-10,-4,1766,1001,1766,716,1766,21002,0,1,-3,1105,1,1790,21208,-4,-1,-9,1206,-9,1786,22102,1,-8,-3,1105,1,1790,22102,1,-7,-3,1001,1733,1,1796,20101,0,0,-2,21208,-2,-1,-9,1206,-9,1812,21201,-8,0,-1,1106,0,1816,21201,-7,0,-1,21208,-5,1,-9,1205,-9,1837,21208,-5,2,-9,1205,-9,1844,21208,-3,0,-1,1105,1,1855,22202,-3,-1,-1,1105,1,1855,22201,-3,-1,-1,22107,0,-1,-1,1106,0,1855,21208,-2,-1,-9,1206,-9,1869,21202,-1,1,-8,1106,0,1873,21202,-1,1,-7,21201,-6,1,-6,1105,1,1708,22101,0,-8,-10,109,-11,2105,1,0,109,7,22207,-6,-5,-3,22207,-4,-6,-2,22201,-3,-2,-1,21208,-1,0,-6,109,-7,2106,0,0,0,109,5,1202,-2,1,1912,21207,-4,0,-1,1206,-1,1930,21102,1,0,-4,21201,-4,0,1,22101,0,-3,2,21102,1,1,3,21102,1949,1,0,1106,0,1954,109,-5,2105,1,0,109,6,21207,-4,1,-1,1206,-1,1977,22207,-5,-3,-1,1206,-1,1977,22102,1,-5,-5,1106,0,2045,22102,1,-5,1,21201,-4,-1,2,21202,-3,2,3,21102,1,1996,0,1105,1,1954,22101,0,1,-5,21101,1,0,-2,22207,-5,-3,-1,1206,-1,2015,21102,1,0,-2,22202,-3,-2,-3,22107,0,-4,-1,1206,-1,2037,21201,-2,0,1,21101,0,2037,0,105,1,1912,21202,-3,-1,-3,22201,-5,-3,-5,109,-6,2105,1,0
];

// IntCode helpers
const getValue = (pointer) => program[pointer] ? program[pointer] : 0;
const getIndex = (program, mode, pointer, relativeBase) => {
  if (mode === 0) {
    return program[pointer]
  } else if (mode === 1) {
    return pointer;
  } else { // mode === 2
    return relativeBase + program[pointer];
  }
};
const getNextPointer = (code, p) => {
  if (code === 1 || code === 2) {
    return p + 4;
  } else if (code === 3 || code === 4 || code === 9) {
    return p + 2;
  } else if (code === 5 || code === 6) {
    return p + 3;
  } else if (code === 7 || code === 8) {
    return p + 4;
  }
};

// Day 20;
const NEWLINE = 10;

const getKey = (row, col) => `${row},${col}`;
const toASCII = (x) => typeof x === 'string' ? x.charCodeAt(0) : x;

const asciiSystem = (input, p2) => {
  for (let i = 0; i < input.length; i++) {
    program[i] = input[i];
  }

  let pointer = 0;
  let relativeBase = 0;

  // day 17 vars
  let springboard = [];
  springboard = [
    'N', 'O', 'T', ' ', 'D', ' ', 'J', NEWLINE,
    'O', 'R', ' ',      'A', ' ', 'J', NEWLINE,
    'A', 'N', 'D', ' ', 'C', ' ', 'J', NEWLINE,
    'N', 'O', 'T', ' ', 'J', ' ', 'J', NEWLINE,
    'A', 'N', 'D', ' ', 'D', ' ', 'J', NEWLINE,
    'W', 'A', 'L', 'K', NEWLINE
  ].map(toASCII);
  if (p2) {
    springboard = [
      'N', 'O', 'T', ' ', 'H', ' ', 'J', NEWLINE,
      'O', 'R', ' ',      'C', ' ', 'J', NEWLINE,
      'A', 'N', 'D', ' ', 'B', ' ', 'J', NEWLINE,
      'A', 'N', 'D', ' ', 'A', ' ', 'J', NEWLINE,
      'N', 'O', 'T', ' ', 'J', ' ', 'J', NEWLINE,
      'A', 'N', 'D', ' ', 'D', ' ', 'J', NEWLINE,
      'R', 'U', 'N', NEWLINE,
    ].map(toASCII);
  }
  let springboardIdx = 0;

  const outputStack = [];
  let robotInput = 0;

  while (program[pointer] !== END_STATE) {
    let opcode = program[pointer];

    // get our opcode into a list of parts
    let parts = opcode.toString().split('').map(Number);
    while (parts.length < 5) {
      parts = [0, ...parts];
    }
    let code = parts[4];

    // get our parameters
    let x = getIndex(program, parts[2], pointer + 1, relativeBase);
    let y = getIndex(program, parts[1], pointer + 2, relativeBase);
    let z = getIndex(program, parts[0], pointer + 3, relativeBase);

    let jumped = false;

    if (code === 1) {
      program[z] = getValue(x) + getValue(y);
    } else if (code === 2) {
      program[z] = getValue(x) * getValue(y);
    } else if (code === 3) {
      // console.log('INPUTTING', springboard[springboardIdx]);
      program[x] = springboard[springboardIdx];
      springboardIdx++;
    } else if (code === 4) {
      const output = program[x];
      outputStack.push(output);
      // console.log('OUTPUT', output);
    } else if (code === 5) {
      if (getValue(x) !== 0) {
        jumped = true;
        pointer = getValue(y);
      }
    } else if (code === 6) {
      if (getValue(x) === 0) {
        jumped = true;
        pointer = getValue(y);
      }
    } else if (code === 7) {
      if (getValue(x) < getValue(y)) {
        program[z] = 1;
      } else {
        program[z] = 0;
      }
    } else if (code === 8) {
      if (getValue(x) === getValue(y)) {
        program[z] = 1;
      } else {
        program[z] = 0;
      }
    } else if (code === 9) {
      relativeBase += getValue(x)
    } else {
      console.log('fail at pointer', pointer);
      return;
    }

    if (!jumped) {
      pointer = getNextPointer(code, pointer);
    }
  }
  return outputStack[outputStack.length - 1];
};

console.log('Part one:', asciiSystem(input));
program = {};
console.log('Part two:', asciiSystem(input, true));