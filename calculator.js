function numEvent() {
    if (secondOperand === '0')
        secondOperand = '';

    secondOperand += event.target.textContent;
}

function zeroEvent() {
    if (secondOperand !== '0')
        secondOperand += '0';
}

function dotEvent() {
    if (!secondOperand.includes('.'))
        secondOperand += '.';
}

function operatorEvent() {
    let currentOp = event.target.textContent;

    if (lastKey === 'operator' && currentOp === '-') {
        secondOperand = '-';
        update();
        return;
    }

    else if (lastKey === 'number')
        calculate();

    pressedOperator = currentOp;
    lastKey = 'operator';
}

function calculate() {
    if (lastKey === 'operator')
        secondOperand = firstOperand;
    else if (secondOperand === '-')
        secondOperand += '0';

    let num1 = Number(firstOperand);
    let num2 = Number(secondOperand);

    firstOperand = operations[pressedOperator](num1, num2);
    update(firstOperand);

    lastKey = 'equal';
}

// --------------------------------- //

let firstOperand;
let secondOperand;
let pressedOperator;
let lastKey;

let operations = {
    '/': (num1, num2) => num1 / num2,
    '*': (num1, num2) => num1 * num2,
    '-': (num1, num2) => num1 - num2,
    '+': (num1, num2) => num1 + num2,
    'none': (num1, num2) => num2
};

function init() {
    firstOperand = '0';
    secondOperand = '0';
    pressedOperator = 'none';
    lastKey = 'number';
    update();
}

function update(operand) {
    if (operand === undefined)
        operand = secondOperand;

    display.textContent = operand.toString().slice(0, 12);
    lastKey = 'number';
}

function checkBeforeNumber() {
    if (lastKey === 'equal')
        init();
    else if (lastKey === 'operator')
        secondOperand = '0';
}

let events = keyEvent => {
    checkBeforeNumber();
    keyEvent();
    update();
};

window.onload = () => {
    init();

    let nums = document.querySelectorAll('.number');
    [...nums].forEach(n => n.onclick = () => events(numEvent));

    let ops = document.querySelectorAll('.operator');
    [...ops].forEach(o => o.onclick = operatorEvent);

    zero.onclick = () => events(zeroEvent);
    dot.onclick = () => events(dotEvent);

    equal.onclick = calculate;
};