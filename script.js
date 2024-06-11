let firstNumber = 0;
let secondNumber = 0;
let operatorQueue = "";
let lastDigitInput = "";
let mainOperation = "";

// basic operation

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
    return a / b;
}

// add listener to all necessary buttons

const numbersContainer = document.querySelector(".numbers-container");
numbersContainer.addEventListener("click", processNumber);

const mainOperatorContainer = document.querySelector(".bottom-right-container");
mainOperatorContainer.addEventListener("click", processOperator);

const secondaryOperatorContainer = document.querySelector(".secondary-operator-container");
secondaryOperatorContainer.addEventListener("click", processSecondaryOperator);

const deleteButton = document.querySelector(".delete-button");
deleteButton.addEventListener("click", deleteDisplay);