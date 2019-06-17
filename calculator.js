function numEvent() {
    if (['0', '-0'].includes(secondOperand))
        secondOperand = secondOperand.slice(0, -1);

    secondOperand += event.srcElement.textContent;
}

function dotEvent() {
    if (!secondOperand.includes('.'))
        secondOperand += '.';
}

function operatorEvent() {
    let currentOp = event.srcElement.textContent;

    if (lastKey === 'operator' && currentOp === '-'){
        secondOperand = '-0';
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
    let nums = document.querySelectorAll('.number');
    [...nums].forEach(n => n.onclick = () => events(numEvent));

    let ops = document.querySelectorAll('.operator');
    [...ops].forEach(o => o.onclick = operatorEvent);

    dot.onclick = () => events(dotEvent);
    equal.onclick = calculate;

    init();
};
