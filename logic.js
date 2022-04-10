const DIGITS = [...document.querySelectorAll('.digit')];
const OPERATORS = [...document.querySelectorAll('.operator')];
const DISPLAY_VALUE = document.querySelector('.result');
const EQUALS = document.querySelector('#equals');
const CLEAR = document.querySelector('#clear');

let storeValue = '';
let num1 = undefined;
let num2 = undefined;
let operator = '';

let add = (input1, input2) => input1 + input2;

let subtract = (input1, input2) => input1 - input2;

let multiply = (input1, input2) => input1 * input2;

let divide = (input1, input2) => input1 / input2;

let operate = (signInput, input1, input2) => {
  let result = 0;
  switch (signInput) {
    case 'plus':
      result = add(input1, input2);
      break;
    case 'minus':
      result = subtract(input1, input2);
      break;
    case 'multiply':
      result = multiply(input1, input2);
      break;
    case 'divide':
      num2 == 0 ? alert('NO') : (result = divide(input1, input2));
      break;
  }
  updateDisplay(result);
  num1 = result;
  num2 = undefined;
  operator = '';
};

let updateDisplay = (num) => {
  let newValue = storeValue + num;
  newValue % 1 == 0
    ? (DISPLAY_VALUE.textContent = newValue)
    : (DISPLAY_VALUE.textContent = parseFloat(newValue).toFixed(1));
};

DIGITS.map((button) => {
  button.addEventListener('click', () => {
    updateDisplay(button.textContent);
    storeValue = DISPLAY_VALUE.textContent;
  });
});

OPERATORS.map((button) => {
  button.addEventListener('click', () => {
    if (num1 == undefined) {
      operator = button.id;
      num1 = parseInt(storeValue);
      storeValue = '';
    } else if (storeValue != '') {
      num2 = parseInt(storeValue);
      storeValue = '';
      operate(operator, num1, num2);
      operator = button.id;
    } else {
      operator = button.id;
    }
  });
});

EQUALS.addEventListener('click', () => {
  num2 = parseInt(DISPLAY_VALUE.textContent);
  if (operator != '') {
    storeValue = '';
    operate(operator, num1, num2);
  }
});

CLEAR.addEventListener('click', () => {
  DISPLAY_VALUE.textContent = '';
  storeValue = '';
  num1 = undefined;
  num2 = undefined;
});
