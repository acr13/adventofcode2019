// IntCode consts
const END_STATE = 99;
const input = [
  3,62,1001,62,11,10,109,2247,105,1,0,800,1531,734,2092,1445,1220,1572,1282,2121,769,1181,1865,1605,1047,1251,2032,608,952,874,1997,1706,1016,571,911,1966,1673,1150,2063,1480,1931,1311,1408,1770,841,670,2185,1640,1115,1080,1801,1373,1902,1342,2154,2216,1834,637,1739,983,701,0,0,0,0,0,0,0,0,0,0,0,0,3,64,1008,64,-1,62,1006,62,88,1006,61,170,1106,0,73,3,65,21002,64,1,1,20102,1,66,2,21102,105,1,0,1106,0,436,1201,1,-1,64,1007,64,0,62,1005,62,73,7,64,67,62,1006,62,73,1002,64,2,132,1,132,68,132,1002,0,1,62,1001,132,1,140,8,0,65,63,2,63,62,62,1005,62,73,1002,64,2,161,1,161,68,161,1101,1,0,0,1001,161,1,169,1001,65,0,0,1102,1,1,61,1102,0,1,63,7,63,67,62,1006,62,203,1002,63,2,194,1,68,194,194,1006,0,73,1001,63,1,63,1105,1,178,21101,210,0,0,106,0,69,2101,0,1,70,1101,0,0,63,7,63,71,62,1006,62,250,1002,63,2,234,1,72,234,234,4,0,101,1,234,240,4,0,4,70,1001,63,1,63,1105,1,218,1105,1,73,109,4,21102,0,1,-3,21102,0,1,-2,20207,-2,67,-1,1206,-1,293,1202,-2,2,283,101,1,283,283,1,68,283,283,22001,0,-3,-3,21201,-2,1,-2,1105,1,263,21202,-3,1,-3,109,-4,2105,1,0,109,4,21102,1,1,-3,21101,0,0,-2,20207,-2,67,-1,1206,-1,342,1202,-2,2,332,101,1,332,332,1,68,332,332,22002,0,-3,-3,21201,-2,1,-2,1105,1,312,22102,1,-3,-3,109,-4,2106,0,0,109,1,101,1,68,359,20101,0,0,1,101,3,68,366,21002,0,1,2,21101,0,376,0,1106,0,436,22101,0,1,0,109,-1,2105,1,0,1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072,262144,524288,1048576,2097152,4194304,8388608,16777216,33554432,67108864,134217728,268435456,536870912,1073741824,2147483648,4294967296,8589934592,17179869184,34359738368,68719476736,137438953472,274877906944,549755813888,1099511627776,2199023255552,4398046511104,8796093022208,17592186044416,35184372088832,70368744177664,140737488355328,281474976710656,562949953421312,1125899906842624,109,8,21202,-6,10,-5,22207,-7,-5,-5,1205,-5,521,21102,1,0,-4,21101,0,0,-3,21101,0,51,-2,21201,-2,-1,-2,1201,-2,385,471,20101,0,0,-1,21202,-3,2,-3,22207,-7,-1,-5,1205,-5,496,21201,-3,1,-3,22102,-1,-1,-5,22201,-7,-5,-7,22207,-3,-6,-5,1205,-5,515,22102,-1,-6,-5,22201,-3,-5,-3,22201,-1,-4,-4,1205,-2,461,1106,0,547,21101,0,-1,-4,21202,-6,-1,-6,21207,-7,0,-5,1205,-5,547,22201,-7,-6,-7,21201,-4,1,-4,1106,0,529,22102,1,-4,-7,109,-8,2105,1,0,109,1,101,1,68,564,20101,0,0,0,109,-1,2106,0,0,1101,0,101477,66,1101,0,4,67,1102,1,598,68,1102,302,1,69,1101,0,1,71,1101,0,606,72,1106,0,73,0,0,0,0,0,0,0,0,10,215836,1101,0,45281,66,1101,0,1,67,1102,635,1,68,1101,0,556,69,1101,0,0,71,1101,637,0,72,1106,0,73,1,1458,1102,1,881,66,1102,1,1,67,1102,1,664,68,1102,556,1,69,1102,2,1,71,1101,0,666,72,1105,1,73,1,7,11,231164,1,78697,1101,73369,0,66,1101,0,1,67,1101,0,697,68,1102,556,1,69,1102,1,1,71,1101,0,699,72,1106,0,73,1,160,23,314845,1101,0,75079,66,1102,1,2,67,1102,1,728,68,1102,302,1,69,1101,1,0,71,1101,732,0,72,1106,0,73,0,0,0,0,1,472182,1101,0,45569,66,1101,0,3,67,1102,1,761,68,1102,1,302,69,1101,1,0,71,1101,0,767,72,1106,0,73,0,0,0,0,0,0,12,55059,1101,0,27967,66,1102,1,1,67,1102,1,796,68,1101,556,0,69,1101,0,1,71,1101,0,798,72,1106,0,73,1,829,38,46353,1101,42283,0,66,1101,1,0,67,1101,0,827,68,1101,556,0,69,1102,1,6,71,1102,1,829,72,1105,1,73,1,19165,6,28162,12,18353,12,36706,4,53359,4,106718,4,160077,1101,0,38873,66,1102,1,1,67,1102,1,868,68,1101,0,556,69,1101,0,2,71,1101,870,0,72,1105,1,73,1,2,23,251876,23,377814,1101,0,52769,66,1102,4,1,67,1102,1,901,68,1101,253,0,69,1101,1,0,71,1102,1,909,72,1105,1,73,0,0,0,0,0,0,0,0,36,19073,1101,0,62969,66,1101,6,0,67,1102,938,1,68,1101,302,0,69,1101,0,1,71,1102,950,1,72,1106,0,73,0,0,0,0,0,0,0,0,0,0,0,0,36,38146,1102,91571,1,66,1102,1,1,67,1102,1,979,68,1102,1,556,69,1102,1,1,71,1101,981,0,72,1105,1,73,1,17,1,157394,1101,92693,0,66,1101,0,1,67,1101,1010,0,68,1102,556,1,69,1101,2,0,71,1101,0,1012,72,1106,0,73,1,1607,11,115582,2,136707,1102,1,2393,66,1102,1,1,67,1101,0,1043,68,1102,1,556,69,1102,1,1,71,1102,1,1045,72,1105,1,73,1,19,19,19961,1101,0,26561,66,1101,0,2,67,1101,0,1074,68,1101,302,0,69,1101,0,1,71,1101,1078,0,72,1106,0,73,0,0,0,0,49,75079,1102,15451,1,66,1102,3,1,67,1101,0,1107,68,1102,302,1,69,1102,1,1,71,1101,0,1113,72,1106,0,73,0,0,0,0,0,0,10,269795,1102,21673,1,66,1101,3,0,67,1101,0,1142,68,1102,302,1,69,1102,1,1,71,1102,1148,1,72,1106,0,73,0,0,0,0,0,0,10,107918,1102,1,56893,66,1101,1,0,67,1102,1177,1,68,1102,556,1,69,1102,1,1,71,1101,1179,0,72,1105,1,73,1,668,22,101477,1102,53959,1,66,1101,0,5,67,1101,0,1208,68,1101,0,253,69,1101,0,1,71,1101,1218,0,72,1105,1,73,0,0,0,0,0,0,0,0,0,0,11,57791,1102,1,29581,66,1101,1,0,67,1101,0,1247,68,1102,556,1,69,1101,1,0,71,1102,1249,1,72,1106,0,73,1,22291,25,187778,1102,27259,1,66,1102,1,1,67,1101,0,1278,68,1101,0,556,69,1101,0,1,71,1102,1,1280,72,1106,0,73,1,11,1,314788,1102,1,20873,66,1102,1,1,67,1101,1309,0,68,1101,556,0,69,1102,1,0,71,1101,1311,0,72,1106,0,73,1,1353,1101,0,80471,66,1102,1,1,67,1102,1,1338,68,1101,556,0,69,1102,1,1,71,1101,0,1340,72,1105,1,73,1,-82,38,30902,1102,1,85889,66,1101,0,1,67,1102,1,1369,68,1101,0,556,69,1101,0,1,71,1102,1371,1,72,1105,1,73,1,1151,37,65019,1102,1,13397,66,1102,3,1,67,1102,1,1400,68,1102,1,302,69,1102,1,1,71,1102,1406,1,72,1106,0,73,0,0,0,0,0,0,10,53959,1101,0,56659,66,1102,4,1,67,1101,0,1435,68,1102,302,1,69,1101,0,1,71,1101,0,1443,72,1105,1,73,0,0,0,0,0,0,0,0,23,62969,1101,0,53359,66,1101,0,3,67,1102,1,1472,68,1102,302,1,69,1102,1,1,71,1102,1,1478,72,1106,0,73,0,0,0,0,0,0,18,158307,1102,46591,1,66,1101,1,0,67,1102,1,1507,68,1102,1,556,69,1101,0,11,71,1102,1,1509,72,1105,1,73,1,1,37,43346,38,15451,40,26794,19,39922,22,304431,25,93889,39,7559,13,53122,49,150158,1,393485,2,91138,1101,0,78697,66,1102,6,1,67,1102,1558,1,68,1101,0,302,69,1101,1,0,71,1102,1570,1,72,1105,1,73,0,0,0,0,0,0,0,0,0,0,0,0,6,14081,1102,1,14081,66,1101,0,2,67,1102,1,1599,68,1102,1,302,69,1102,1,1,71,1101,0,1603,72,1106,0,73,0,0,0,0,18,105538,1101,0,18353,66,1102,3,1,67,1102,1,1632,68,1101,0,302,69,1102,1,1,71,1101,1638,0,72,1106,0,73,0,0,0,0,0,0,18,211076,1101,0,19073,66,1102,2,1,67,1101,0,1667,68,1101,351,0,69,1102,1,1,71,1102,1,1671,72,1106,0,73,0,0,0,0,255,42283,1101,93889,0,66,1101,2,0,67,1101,0,1700,68,1101,0,302,69,1102,1,1,71,1102,1704,1,72,1106,0,73,0,0,0,0,39,15118,1101,91457,0,66,1102,1,1,67,1102,1733,1,68,1102,1,556,69,1101,0,2,71,1102,1,1735,72,1106,0,73,1,37,22,202954,1,236091,1102,1,65167,66,1101,0,1,67,1102,1766,1,68,1101,556,0,69,1102,1,1,71,1101,1768,0,72,1106,0,73,1,-114,40,40191,1101,5591,0,66,1101,1,0,67,1101,1797,0,68,1101,556,0,69,1102,1,1,71,1102,1,1799,72,1106,0,73,1,1093,40,13397,1102,1,7559,66,1102,1,2,67,1101,0,1828,68,1101,302,0,69,1101,1,0,71,1102,1832,1,72,1106,0,73,0,0,0,0,13,26561,1101,76667,0,66,1102,1,1,67,1101,0,1861,68,1101,0,556,69,1102,1,1,71,1102,1863,1,72,1105,1,73,1,6563,19,59883,1102,1,57791,66,1101,4,0,67,1102,1,1892,68,1102,302,1,69,1102,1,1,71,1101,0,1900,72,1105,1,73,0,0,0,0,0,0,0,0,18,52769,1102,1,23687,66,1101,0,1,67,1101,1929,0,68,1102,1,556,69,1101,0,0,71,1102,1931,1,72,1106,0,73,1,1806,1102,35869,1,66,1102,1,1,67,1101,1958,0,68,1101,0,556,69,1101,3,0,71,1101,0,1960,72,1106,0,73,1,5,31,56659,31,169977,23,188907,1101,63199,0,66,1101,1,0,67,1102,1993,1,68,1102,556,1,69,1101,1,0,71,1101,0,1995,72,1105,1,73,1,21,22,405908,1102,19961,1,66,1101,3,0,67,1101,0,2024,68,1101,302,0,69,1101,1,0,71,1101,0,2030,72,1105,1,73,0,0,0,0,0,0,10,161877,1102,65579,1,66,1101,1,0,67,1102,1,2059,68,1101,0,556,69,1101,1,0,71,1101,2061,0,72,1106,0,73,1,421,11,173373,1101,44279,0,66,1102,1,1,67,1102,1,2090,68,1102,556,1,69,1101,0,0,71,1101,2092,0,72,1106,0,73,1,1762,1102,1,60353,66,1101,0,1,67,1101,2119,0,68,1101,0,556,69,1101,0,0,71,1101,0,2121,72,1106,0,73,1,1423,1102,1,70573,66,1102,1,1,67,1102,1,2148,68,1101,0,556,69,1101,2,0,71,1102,2150,1,72,1106,0,73,1,10,31,113318,23,125938,1101,40277,0,66,1101,0,1,67,1101,0,2181,68,1101,0,556,69,1101,0,1,71,1102,1,2183,72,1105,1,73,1,-34,37,21673,1101,0,50957,66,1102,1,1,67,1101,2212,0,68,1101,556,0,69,1102,1,1,71,1101,2214,0,72,1105,1,73,1,125,31,226636,1102,91961,1,66,1101,0,1,67,1101,2243,0,68,1101,0,556,69,1101,1,0,71,1102,2245,1,72,1106,0,73,1,-21,2,45569
];

// IntCode helpers
const getValue = (program, pointer) => program[pointer] ? program[pointer] : 0;
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

const nic = (id, memory) => {
  let outputStack = [];
  let haltStack = [];

  let program = memory.memory;
  let pointer = memory.pointer;
  let relativeBase = memory.relativeBase;
  let queue = memory.queue;
  let initialized = memory.initialized;
  let idle = memory.idle;

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
      program[z] = getValue(program, x) + getValue(program, y);
    } else if (code === 2) {
      program[z] = getValue(program, x) * getValue(program, y);
    } else if (code === 3) {
      if (!initialized) {
        // console.log(`INPUT - ${id}`, id);
        program[x] = id;
        initialized = true;
      } else if (queue.length) {
        idle = 0;
        let [head, ...tail] = queue;
        queue = tail;
        program[x] = head;
        // console.log(`INPUT - ${id}`, head);
      } else {
        // console.log(`INPUT - ${id}`, -1);
        program[x] = -1;
        haltStack.push(-1);

        if (haltStack.length === 5) {
          // will reset on restart
          return {
            memory: program,
            pointer,
            relativeBase,
            outputStack,
            queue,
            idle: idle + 1,
          }; 
        }
      }
    } else if (code === 4) {
      const output = program[x];
      // console.log(`OUTPUT - ${id} -`, output);
      outputStack.push(output);
    } else if (code === 5) {
      if (getValue(program, x) !== 0) {
        jumped = true;
        pointer = getValue(program, y);
      }
    } else if (code === 6) {
      if (getValue(program, x) === 0) {
        jumped = true;
        pointer = getValue(program, y);
      }
    } else if (code === 7) {
      if (getValue(program, x) < getValue(program, y)) {
        program[z] = 1;
      } else {
        program[z] = 0;
      }
    } else if (code === 8) {
      if (getValue(program, x) === getValue(program, y)) {
        program[z] = 1;
      } else {
        program[z] = 0;
      }
    } else if (code === 9) {
      relativeBase += getValue(program, x)
    } else {
      console.log('fail at pointer', pointer);
      return;
    }

    if (!jumped) {
      pointer = getNextPointer(code, pointer);
    }
  }
};

const master = {};
const MAX_COMPUTERS = 50;
let currentNIC = 0;

const hashTheInput = () => {
  const program = {};
  for (let i = 0; i < input.length; i++) {
    program[i] = input[i];
  }
  return program;
};

const addToNicInput = (stack) => {
  let packet = [];

  for (let i = 0; i < stack.length; i++) {
    packet.push(stack[i]);

    if (packet.length === 3) {
      let [addr, x, y] = packet;

      if (addr === 255) {
        master[addr] = { x, y };
        // return y;
      } else {
        master[addr].queue.push(x, y);
      }
      packet = [];
    }
  }

  return false;
};

const isIdle = () => {
  for (let i = 0; i < MAX_COMPUTERS; i++) {
    if (master[i].idle < 100) {
      return false;
    }
  }

  return true;
};

for (let i = 0; i < MAX_COMPUTERS; i++) {
  master[i] = {
    memory: hashTheInput(),
    pointer: 0,
    relativeBase: 0,
    queue: [],
    outputStack: [],
    idle: 0,
    initialized: false,
  };
}

master[255] = { x: -1, y: -1 };
const natPackets = [];

while (true) {
  let output = nic(currentNIC, master[currentNIC]);
  if (output.outputStack.length) {
    const p1 = addToNicInput(output.outputStack);
    // if (p1) {
    //   console.log('Part one:', p1);
    //   return;
    // }
  }

  master[currentNIC] = {
    memory: output.memory,
    pointer: output.pointer,
    relativeBase: output.relativeBase,
    queue: output.queue,
    outputStack: output.outputStack,
    idle: output.idle,
    initialized: true,
  }

  if (currentNIC === 49 && isIdle()) {
    master[0].queue.push(master[255].x, master[255].y);

    if (master[255].y === natPackets[natPackets.length - 1]) {
      console.log('Part two:', master[255].y);
      return;
    }

    natPackets.push(master[255].y);
  }

  currentNIC = (currentNIC === 49) ? 0 : currentNIC + 1;
}
