let firstNumber = 0;
let secondNumber = 0;
let operatorQueue = "";
let lastDigitInput = "";
let mainOperationInput = [];

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

        if (mainOperationInput.some(item => {
            return (
            item === "+" ||
            item === "-" ||
            item === "*" ||
            item === "/")
        })){
            inputAfterOperator(number);
        } else {
            inputBeforeOperator(number);
        }
    }

    console.log(mainOperationInput);
}

function inputBeforeOperator(number) {

    if (mainOperationInput.length === 0) {
        if (number === ".") {
            mainOperationInput.push("0");
            mainOperationInput.push(".");
        } else {
            mainOperationInput.push(number);
        }
    } else if (number === "." && !mainOperationInput.includes(".")) {
        console.log("if 2");
        mainOperationInput.push(number);
    } else if (mainOperationInput.length === 1 && mainOperationInput[0] === "0") {
        if(number !== "0" && number !== ".") {
            mainOperationInput.pop();
            mainOperationInput.push(number);
        }
        console.log("if 3")
    } else if (number !== "."){
        mainOperationInput.push(number);
        console.log("if 4");
    }
}

function inputAfterOperator(number) {
    const operatorIndex = mainOperationInput.findIndex(item => {
                        return (item === "+" ||
                                item === "-" ||
                                item === "*" ||
                                item === "/");
                    });
    const rightHandNumber = [...mainOperationInput].slice(operatorIndex+1);

    console.log("operator-index: " + operatorIndex);
    console.log("right-value: " + rightHandNumber);
    console.log("right-length: " + rightHandNumber.length);

    if (rightHandNumber.length === 0) {
        if (number === ".") {
            mainOperationInput.push("0");
            mainOperationInput.push(".");
        } else {
            mainOperationInput.push(number);
        }
    } else if (number === "." && !rightHandNumber.includes(".")) {
        console.log("after if 2");
        mainOperationInput.push(number);
    } else if (rightHandNumber.length === 1 && rightHandNumber[0] === "0") {
        if(number !== "0" && number !== ".") {
            mainOperationInput.pop();
            mainOperationInput.push(number);
        }
        console.log("after if 3")
    } else if (number !== "."){
        mainOperationInput.push(number);
        console.log("after if 4");
    }
}

function processOperator(event) {
    const operator = event.target.matches(".operator-button") ? event.target : null;
    const operatorValue = operator.getAttribute("data-value");

    if (operatorValue === "+") addAdditionOperator(event);
    else if (operatorValue === "-") addSubtractionOperator(event);
    else if (operatorValue === "*") addMultiplicationOperator(event);
    else if (operatorValue === "/") addDivisionOperator(event);
    else if (operatorValue === "=") evaluateOperation(event);
}

function addAdditionOperator(event) {
    operatorQueue = "+";
    mainOperationInput.push(operatorQueue);
    console.log("addition");
}

function addSubtractionOperator(event) {
    console.log("subtraction");
}

function addMultiplicationOperator(event) {
    console.log("multiplication");
}

function addDivisionOperator(event) {
    console.log("division");
}

function evaluateOperation(event) {
    console.log("evaluation");
}

function processSecondaryOperator(event) {

}

function deleteDisplay(event) {

}