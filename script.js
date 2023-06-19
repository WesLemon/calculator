function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return "Error !/0";
    }
    return x / y;
}

let operand1;
let operand2;
let operator = '';

function operate(operand1, operator, operand2) {
    switch (operator) {
        case '+':
            return add(operand1, operand2)
        case '-':
            return subtract(operand1, operand2)
        case '*':
            return multiply(operand1, operand2)
        case '/':
            return divide(operand1, operand2)
    }
}