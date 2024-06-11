let firstNumber = 0;
let secondNumber = 0;
let operatorQueue = "";
let lastDigitInput = "";
let inputtedNumber = [];

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

function processNumber(event) {
    inputNumber(event);

}

function inputNumber(event) {
    if (event.target.matches(".number")) {
        const number = event.target.getAttribute("data-value");
        console.log("test" + number);
        // add number to array
        if (inputtedNumber.length === 0) {
            if (number === ".") {
                inputtedNumber.push("0");
                inputtedNumber.push(".");
            } else {
                inputtedNumber.push(number);
            }
        } else if (number === "." && !inputtedNumber.includes(".")) {
            console.log("if 2");
            inputtedNumber.push(number);
        } else if (inputtedNumber.length === 1 && inputtedNumber[0] === "0") {
            if(number !== "0" && number !== ".") {
                inputtedNumber.pop();
                inputtedNumber.push(number);
            }
            console.log("if 3")
        } else if (number !== "."){
            inputtedNumber.push(number);
            console.log("if 4");
        }
    }
    console.log(inputtedNumber);
}

function processOperator(event) {

}

function processSecondaryOperator(event) {

}

function deleteDisplay(event) {

}