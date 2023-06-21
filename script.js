let operand1 = null;
let operand2 = null;
let operator = '';
let divError = false;
let displayValue = '';
let running = false;
let hasDot = false;

function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return Number(x) - Number(y);
}

function multiply(x, y) {
    return Number(x) * Number(y);
}

function divide(x, y) {
    if (Number(y) === 0) {
        operand1 = null
        operand2 = null
        operator = ''
        displayValue = ''
        hasDot = false
        divError = true
        return "Error !/0";
    }
    return +(Number(x) / Number(y)).toFixed(6);
}

function operate(operand1, operator, operand2) {
    let result = ''
    switch (operator) {
        case '+':
            result = add(operand1, operand2);
            break;
        case '-':
            result = subtract(operand1, operand2);
            break;
        case '*':
            result = multiply(operand1, operand2);
            break;
        case '/':
            result = divide(operand1, operand2);
            break;
    }
    return result
}

function showDisplay() {
    display = document.querySelector('.display');
    if (displayValue.length > 17) {
        display.textContent = 'Input too large'
        operand1 = null
        operand2 = null
        operator = null
        displayValue = ''
        hasDot = false;
    }
    else {
        display.textContent = displayValue;
    }

}

showDisplay()

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', handleEvent);
})

function handleEvent(event) {
    let button = event.target;

    if (button.classList.contains('dot')) {
        handleDot(button)
    }
    else if (button.classList.contains('digit')) {
        handleDigit(button)
    }
    else if (button.classList.contains('operator')) {
        if (button.textContent === '-' && operand2 === null) {
            handleDigit(button)
        }
        else {
            handleOperator(button)
        }
    }
    else if (button.classList.contains('equals')) {
        handleEquals()
    }
    else if (button.classList.contains('clear')) {
        displayValue = ''
        operand1 = null
        operand2 = null
        operator = ''
        hasDot = false
        showDisplay()
    }
    else {
        if (displayValue.substring(displayValue.length - 1) === '.') {
            hasDot = false
        }
        displayValue = displayValue.slice(0, -1)
        showDisplay()
    }
}

function handleEquals() {
    if (operand1 != null && operand2 === null) {
        operand2 = displayValue;
        displayValue = operate(operand1, operator, operand2)
        if (!divError) {
            operand1 = null
            operand2 = null
        }
        showDisplay()
        if (divError) {
            displayValue = ''
            hasDot = false
        }
        divError = false
        running = true
    }
}

function handleOperator(button) {
    if (displayValue === '') {
        return
    }
    else if (operand1 === null) {
        operator = button.textContent
        operand1 = displayValue;
        displayValue += button.textContent;
        showDisplay()
        displayValue = ''
        hasDot = false
    }
    else if (operand2 === null) {
        operand2 = displayValue;
        displayValue = operate(operand1, operator, operand2)
        if (!divError) {
            operand1 = displayValue
            operand2 = null
            operator = button.textContent
            displayValue += operator
        }
        showDisplay()
        displayValue = ''
        hasDot = false
        divError = false
    }
}

function handleDigit(button) {
    if (running === true) {
        running = false
        displayValue = ''
        hasDot = false
    }
    if (displayValue.length < 16) {
        displayValue += button.textContent;
        showDisplay();
    }

}

function handleDot(button) {
    if (!hasDot) {
        handleDigit(button)
    }
    hasDot = true
}