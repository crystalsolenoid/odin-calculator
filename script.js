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
  if (a === 0 && b === 0) return "0/0";
  if (b === 0) return '+/-infinity???';
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

let operator = '';
let result = null;
let cleared = true;

clearEntry();

function writeOutput() {
  if (!cleared) {
    display.innerText = result;
  } else if (displayValue === '') {
    display.innerText = '0';
  } else {
    display.innerText = displayValue;
  }
}

function clearEntry() {
  result = null;
  cleared = true;
  displayValue = '';
  writeOutput();
}

function clearOperation() {
  operator = '';
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
  if (!cleared) { // if entering more numbers, clear result display
    clearEntry();
  }
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
  if (result === null) {
    result = +displayValue;
  } else { // operator chaining
    result = operate(operator, result, +displayValue);
  }
  cleared = false;
  setDisplayValue(result);
  operator = e.target.id;
}

function equalPress(e) {
  result = operate(operator, result, +displayValue);
  cleared = false;
  setDisplayValue(result);
}

document.querySelectorAll('.operator').forEach(btn => {
  btn.addEventListener('click', operatorPress);
});

document.querySelector('#equal').addEventListener('click', equalPress);
