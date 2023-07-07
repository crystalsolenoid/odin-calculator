function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function percent(a) {
  // unary operator not implemented
}

function operate(operator, a, b) {
  switch (operator) {
    case 'plus':
      return add(a, b);
    case 'minus':
      return subtract(a, b);
    case 'times':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
    case 'percent':
      return percent(a);
  }
}

let displayValue;
let display = document.querySelector('#output');

let operandA = null;
let operandB = null;
let operator = '';

clearEntry();

function writeOutput() {
  if (displayValue === '' && operator === '') {
    display.innerText = '0';
  } else if (displayValue === '') {
    display.innerText = operandA;
  } else {
    display.innerText = displayValue;
  }
}

function clearEntry() {
  displayValue = '';
  writeOutput();
}

function clearOperation() {
  operator = '';
  operandA = null;
  operandB = null;
  clearEntry()
}

function appendDisplayValue(value) {
  let digit = value.toString();
  displayValue += digit;
  writeOutput();
}

function setDisplayValue(value) {
  displayValue = value;
  writeOutput();
}

function numberPress(e) {
  let value = e.target.id[1];
  if (displayValue.length === 14) return; // don't overflow display
  appendDisplayValue(value);
}

let numNodeList = document.querySelectorAll('.number');
numNodeList.forEach(node => {
  if (node.id === "point") {
  } else {
    node.addEventListener('click', numberPress);
  }
});

document.querySelector('#ce').addEventListener('click', clearEntry);
document.querySelector('#c').addEventListener('click', clearOperation);

function operatorPress(e) {
  operator = e.target.id;
  operandA = +displayValue;
  clearEntry();
}

function plussPress(e) {
  operandA = +displayValue;
  operator = '+';
  clearEntry();
}

function minusPress(e) {
  operandA = +displayValue;
  operator = '-';
  clearEntry();
}

function equalPress(e) {
  operandB = +displayValue;
  setDisplayValue(operate(operator, operandA, operandB));
  displayValue = '';
}

document.querySelectorAll('.operator').forEach(btn => {
  btn.addEventListener('click', operatorPress);
});

document.querySelector('#equal').addEventListener('click', equalPress);





