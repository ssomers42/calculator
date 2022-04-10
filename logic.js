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

let pressDigit = (button) => {
  updateDisplay(button.textContent);
  storeValue = DISPLAY_VALUE.textContent;
};

let pressOperator = (button) => {
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
};

let pressEquals = () => {
  num2 = parseInt(DISPLAY_VALUE.textContent);
  if (operator != '') {
    storeValue = '';
    operate(operator, num1, num2);
  }
};

let pressClear = () => {
  DISPLAY_VALUE.textContent = '';
  storeValue = '';
  num1 = undefined;
  num2 = undefined;
};

let updateDisplay = (num) => {
  let newValue = storeValue + num;
  newValue % 1 == 0
    ? (DISPLAY_VALUE.textContent = newValue)
    : (DISPLAY_VALUE.textContent = parseFloat(newValue).toFixed(1));
};

DIGITS.map((button) =>
  button.addEventListener('click', () => pressDigit(button))
);

//Bind click event to operators.
OPERATORS.map((button) =>
  button.addEventListener('click', () => pressOperator(button))
);

//Calculate expression
EQUALS.addEventListener('click', () => pressEquals());

//Restart calculator
CLEAR.addEventListener('click', () => pressClear());

//Keybinding for numbers
document.addEventListener('keydown', (e) => {
  DIGITS.map((button) => {
    if (e.key == button.id) {
      pressDigit(button);
    }
  });
});

//Keybinding for operators
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case '+':
      pressOperator(document.querySelector('#plus'));
      break;
    case '-':
      pressOperator(document.querySelector('#minus'));
      break;
    case '*':
      pressOperator(document.querySelector('#multiply'));
      break;
    case '/':
      pressOperator(document.querySelector('#divide'));
      break;
    case '.':
      pressDigit(document.querySelector('#dot'));
      break;
    case '=':
      pressEquals();
      break;
    case 'Enter':
      pressEquals();
      break;
    case 'Escape':
      pressClear();
      break;
  }
});
