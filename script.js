let operand1 = null;
let operand2 = null;
let operator = '';
let divError = false;
let displayValue = '';
let running = false;

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
        divError = true
        return "Error !/0";
    }
    return +(Number(x) / Number(y)).toFixed(6);
}

function operate(operand1, operator, operand2) {
    switch (operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '*':
            return multiply(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
    }
}

function showDisplay() {
    display = document.querySelector('.display');
    display.textContent = displayValue;
}

showDisplay()

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', handleEvent);
})

function handleEvent(event) {
    let button = event.target;
    if (button.classList.contains('digit')) {
        if(running === true) {
            running = false
            displayValue = ''
        }
        displayValue += button.textContent;
        showDisplay();
    }
    else if (button.classList.contains('operator')) {
        if( displayValue === '') {
            return
        }
        else if (operand1 === null) {
            operator = button.textContent
            operand1 = displayValue;
            displayValue += button.textContent;
            showDisplay()
            displayValue = ''
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
            divError = false
        }
    }
    else if (button.classList.contains('equals')) {
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
            }
            divError = false
            running = true
        }
    }
    else if (button.classList.contains('clear')) {
        displayValue = ''
        operand1 = null
        operand2 = null
        operator = ''
        showDisplay()
    }
}