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

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
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

function plussPress(e) {
  operandA = +displayValue;
  operator = '+';
  clearEntry();
}

function equalPress(e) {
  operandB = +displayValue;
  setDisplayValue(operate(operator, operandA, operandB));
}

document.querySelector('#plus').addEventListener('click', plussPress);
document.querySelector('#equal').addEventListener('click', equalPress);
