function numEvent() {
    if ('-0'.includes(secondOperand))
        secondOperand = secondOperand.slice(0, -1);

    secondOperand += last.Key();
}

function dotEvent() {
    if (!secondOperand.includes('.'))
        secondOperand += '.';
}

function operatorEvent() {
    if (last.Type === 'number')
        calculate();
    else if (last.Type === 'operator' && last.Key() === '-') {
        secondOperand = '-0';
        update();
        last.Type = 'negative';
        return;
    }

    last.Type = 'operator';
    last.Operator = last.Key();
}

function calculate() {
    if (last.Type === 'operator')
        secondOperand = firstOperand;

    let num1 = Number(firstOperand);
    let num2 = Number(secondOperand);

    firstOperand = operations[last.Operator](num1, num2);
    update(firstOperand);

    last.Type = 'equal';
}

// --------------------------------- //

let firstOperand;
let secondOperand;
const last = {};

const operations = {
    '/': (num1, num2) => num1 / num2,
    '*': (num1, num2) => num1 * num2,
    '-': (num1, num2) => num1 - num2,
    '+': (num1, num2) => num1 + num2,
    'none': (num1, num2) => num2
};

function init() {
    firstOperand = '0';
    secondOperand = '0';
    last.Type = 'number';
    last.Operator = 'none';
    last.Key = () => event.srcElement.textContent;
    update();
}

function update(operand) {
    if (operand === undefined)
        operand = secondOperand;

    display.textContent = operand.toString().slice(0, 12);
    last.Type = 'number';
    console.log(secondOperand);
}

function checkBeforeNumber() {
    if (last.Type === 'equal')
        init();
    else if (last.Type === 'operator')
        secondOperand = '0';
}

const events = keyEvent => {
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