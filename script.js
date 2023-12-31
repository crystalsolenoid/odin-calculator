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
  return a / 100;
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
  }
}

function unary(operator, a) {
  switch (operator) {
    case 'percent':
      return percent(a);
  }
}

let displayValue;
let display = document.querySelector('#output');

let operator = '';
let unaryOperator = '';
let result = null;
let cleared = true;
let repeatOperand = null;

clearEntry();

function limitWidth(num, width) { // make sure results don't overflow
  if (num.toString().length <= width) return num.toString();
  let leftLength = Math.round(num).toString().length;
  let expValue = Math.floor(Math.log10(num));
  // if the non-decimal part doesn't overflow
  // and the number is not so small that rounding would
  // lose more precision than sci notation, don't do sci notation
  if (leftLength <= width && expValue >= width) {
    return num.toString().substring(0, width);
  } else { // we need scientific notation
    let expLength = (num < 0 ? 1 : 0) // minus sign
                  + 1 // leading digit
                  + 1 // decimal
                  + 1 // E
                  + (expValue > 0 ? 1 : 0) // exp + sign (- incl. in exp value)
                  + expValue.toString().length; // exp value length
    let availLength = width - expLength;
    if (availLength < 0) return 'overflow'; // no room for sci notation
    return num.toExponential(availLength).toString();
    return Number.parseFloat(num).toExponential(availLength).toString();
  }
}

function writeOutput(message) {
  if (!cleared) {
    if (message === undefined) message = result;
    display.innerText = limitWidth(message, 14);
  } else if (displayValue === '') {
    display.innerText = '0';
  } else {
    display.innerText = displayValue;
  }
}

function clearEntry() {
  cleared = true;
  displayValue = '';
  repeatOperand = null;
  writeOutput();
}

function clearOperation() {
  operator = '';
  clearEntry()
  result = null;
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

function tryInputNumber() {
  if (!cleared) { // if entering more numbers, clear result display
    clearEntry();
  }
  if (displayValue.length === 14) return false; // don't overflow display
  if (repeatOperand !== null) {
    clearOperation();
  }
  return true;
}

function numberPress(e) {
  let value = e.target.id[1];
  if (!tryInputNumber()) return;
  appendDisplayValue(value);
}

function decimalPress(e) {
  if (!tryInputNumber()) return;
  if (displayValue.toString().includes('.') // can't add multiple decimal points
   || displayValue.toString().includes(',')) { // make sure no locale bugs come up
    return;
  }
  if (displayValue === '') {
    appendDisplayValue('0.');
  } else {
    appendDisplayValue('.');
  }
}

let numNodeList = document.querySelectorAll('.number');
numNodeList.forEach(node => {
  if (node.id === "point") {
    node.addEventListener('click', decimalPress);
  } else {
    node.addEventListener('click', numberPress);
  }
});

document.querySelector('#ce').addEventListener('click', clearEntry);
document.querySelector('#c').addEventListener('click', clearOperation);

function operatorPress(e) {
  if (repeatOperand !== null && cleared === true) {
    clearOperation();
  }
  if (unaryOperator !== '' || result === null || repeatOperand !== null) {
    result = +displayValue;
    repeatOperand = null;
  } else { // operator chaining
    result = operate(operator, result, +displayValue);
  }
  cleared = false;
  setDisplayValue(result);
  operator = e.target.id;
  unaryOperator = '';
}

function unaryPress(e) {
  cleared = false;
  displayValue = unary(e.target.id, +displayValue).toString();
  writeOutput(+displayValue); // avoids having to set result;
  unaryOperator = e.target.id;
}

function equalPress(e) {
  if (operator === '' || result === null || displayValue === '')
    return; // don't call operate on incomplete data
  if (repeatOperand !== null) {
    result = operate(operator, +displayValue, repeatOperand);
  } else {
    repeatOperand = +displayValue;
    result = operate(operator, result, +displayValue);
  }
  cleared = false;
  setDisplayValue(result);
}

document.querySelectorAll('.operator').forEach(btn => {
  btn.addEventListener('click', operatorPress);
});

document.querySelector('#percent').addEventListener('click', unaryPress);

document.querySelector('#equal').addEventListener('click', equalPress);
