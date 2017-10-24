/**
 * A tiny toy equation generator
 */

var cfProb = 10; // base probability to generate a point.

var probabilityClass = {
  POINT: cfProb,
  LENGTH: cfProb * 0.5,
  TRIGONOMETRY: cfProb * 0.9,
  ARITHMETICS: cfProb * 0.6,
  MINMAX: cfProb * 0.4,
  EXP: cfProb * 0.1,
  SIGN: cfProb * 0.01,
}

class BaseFunctionNode {
  constructor(className) {
    this.probability = 0;
    this.className = className;
  }

  getProbability() {
    return probabilityClass[this.className];
  }

  render() {
    return '';
  }
}

class SingleArgumentFunction extends BaseFunctionNode {
  constructor(operator, p) {
    super(p);
    this.operator = operator;
  }

  render() {
    var prevP = this.p;

    var prevP = this.getProbability();
    probabilityClass[this.className] *= 0.25;
    normalizeProbabilities();
    let args = generateArguments();
    probabilityClass[this.className] = prevP;
    normalizeProbabilities();
    return this.operator(args);
  }
}

class DualArgumentFunction extends BaseFunctionNode {
  constructor(operator, p) {
    super(p);
    this.operator = operator;
  }

  render() {
    // Decrease our probability to appear
    var prevP = this.getProbability();
    probabilityClass[this.className] *= 0.25;

    normalizeProbabilities();
    var left = generateArguments();
    var right = generateArguments();
    // revert it back;
    probabilityClass[this.className] = prevP;
    normalizeProbabilities();
    return this.operator(left, right);
  }
}

class ConstantFunction extends BaseFunctionNode {
  constructor(constant, p) {
    super(p);
    this.constant = constant;
  }

  render() {
    return this.constant;
  }
}


var fList = [
  new ConstantFunction('p.x', 'POINT'),
  new ConstantFunction('p.y', 'POINT'),

  // new DualArgumentFunction((a, b) => `length(vec2(${a}, ${b}))`, 'TRIGONOMETRY'),
  new ConstantFunction('length(p)', 'LENGTH'),

  new SingleArgumentFunction(a => `sin(${a})`, 'TRIGONOMETRY'),
  new SingleArgumentFunction(a => `cos(${a})`, 'TRIGONOMETRY'),
  // new SingleArgumentFunction(a => `sqrt(${a})`, cfProb * 0.8),
  // new SingleArgumentFunction(a => `inversesqrt(${a})`, cfProb * 0.8),


  new DualArgumentFunction((a, b) => `${a}*${b}`, 'ARITHMETICS'),
  new DualArgumentFunction((a, b) => `${a}/${b}`, 'ARITHMETICS'),
  new DualArgumentFunction((a, b) => `(${a}+${b})`, 'ARITHMETICS'),
  new DualArgumentFunction((a, b) => `(${a}-${b})`, 'ARITHMETICS'),

  new DualArgumentFunction((a, b) => {
    if (a === b) return a;
    return `min(${a},${b})`
  }, 'MINMAX'),
  new DualArgumentFunction((a, b) => {
    if (a === b) return a;
    return `max(${a},${b})`
  } , 'MINMAX'),

  new SingleArgumentFunction(a => `log(${a})`, 'EXP'),
  new SingleArgumentFunction(a => `exp(${a})`, 'EXP'),
  new DualArgumentFunction((a, b) => `pow(${a}, ${b})`, 'EXP'),

  new SingleArgumentFunction(a => `abs(${a})`, 'SIGN'),
  new SingleArgumentFunction(a => `sign(${a})`, 'SIGN'),

  //new ConstantFunction('1.', cfProb * 0.001),
];


function normalizeProbabilities() {
  var sum = 0;
  fList.forEach(element => (sum += element.getProbability()));
  fList.forEach(element => element.probability = element.getProbability()/sum);
}

function generateArguments() {
  var p = Math.random();
  var cumulativeProbability = 0;
  var item;
  for (var i = 0; i < fList.length; ++i) {
    item = fList[i];
    cumulativeProbability += item.probability;
    if (p < cumulativeProbability) {
      break;
    }
  }

  if (!item) throw new Error('no more items');

  return item.render();
}

export default function generate() {
  normalizeProbabilities();
  var vX = generateArguments();
  var vY = generateArguments();
  return `v.x = ${vX};
v.y = ${vY};
  `;
}