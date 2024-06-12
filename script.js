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
deleteButton.addEventListener("click", deleteLastDigit);

const toggleNegativeButton = document.querySelector(".negative-toggle-button");
toggleNegativeButton.addEventListener("click", toggleNegative);

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
        updateDisplay();
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
    const operatorIndex = getOperatorIndex(mainOperationInput);
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
    } else if (rightHandNumber.length === 2 && rightHandNumber[0] === "-" && rightHandNumber[1] === "0"){
        mainOperationInput.pop();
        mainOperationInput.push(number);
    }else if (number !== "."){
        mainOperationInput.push(number);
        console.log("after if 4");
    }
}

function processOperator(event) {
    const operator = event.target.matches(".operator-button") ? event.target : null;
    const operatorValue = operator.getAttribute("data-value");

    if (operatorValue === "+") addAdditionOperator();
    else if (operatorValue === "-") addSubtractionOperator();
    else if (operatorValue === "*") addMultiplicationOperator();
    else if (operatorValue === "/") addDivisionOperator();
    else if (operatorValue === "=") evaluateOperation();
    updateDisplay();
}

function isOperatorIncludedIn(array) {
    const listOfOperator = array.filter(item => {
        return (item === "+" ||
                item === "-" ||
                item === "*" ||
                item === "/");
    });

    if (listOfOperator.length > 1 ) {
        return true;
    } else if (listOfOperator.length === 1 && array[0] !== "-") {
        return true;
    } else {
        return false;
    }
}

function isLastDigitAnOperator(array) {
    return ["+", "-", "*", "/"].some(item => item === array[array.length -1]);
}

function getOperator(array) {
    let listOfOperator = array.filter(item => {
            return (item === "+" ||
                    item === "-" ||
                    item === "*" ||
                    item === "/")
        });

    if (listOfOperator.length > 1) {
        if (array[0] !== "-") return listOfOperator[0];
        return listOfOperator[1];
    } else {
        return listOfOperator[0];
    }
}

function getOperatorIndex(array) {
    let listOfOperator = array.filter(item => {
            return (item === "+" ||
                    item === "-" ||
                    item === "*" ||
                    item === "/")
        });

    if (listOfOperator.length > 1) {
        return array.slice(1).findIndex(item => item === getOperator(array)) + 1;
    } else {
        return array.findIndex(item => item === getOperator(array));
    }
}


function addAdditionOperator() {
    if (mainOperationInput.length === 0) return;
    else if (isLastDigitAnOperator(mainOperationInput)) mainOperationInput.pop();
    else if (isOperatorIncludedIn(mainOperationInput)) evaluateOperation();
    mainOperationInput.push("+");
    console.log("addition");
}

function addSubtractionOperator() {
    if (mainOperationInput.length === 0) return;
    else if (isLastDigitAnOperator(mainOperationInput)) mainOperationInput.pop();
    else if (isOperatorIncludedIn(mainOperationInput)) evaluateOperation();
    mainOperationInput.push("-");
    console.log("subtraction");
}

function addMultiplicationOperator() {
    if (mainOperationInput.length === 0) return;
    else if (isLastDigitAnOperator(mainOperationInput)) mainOperationInput.pop();
    else if (isOperatorIncludedIn(mainOperationInput)) evaluateOperation();

    mainOperationInput.push("*");
    console.log("multiplication");
}

function addDivisionOperator() {
    if (mainOperationInput.length === 0) return;
    else if (isLastDigitAnOperator(mainOperationInput)) mainOperationInput.pop();
    else if (isOperatorIncludedIn(mainOperationInput)) evaluateOperation();

    mainOperationInput.push("/");
    console.log("division");
}

function evaluateOperation() {
    if (!isOperatorIncludedIn(mainOperationInput)) return;
    else if (isLastDigitAnOperator(mainOperationInput)) return;

    const operator = getOperator(mainOperationInput);
    const operatorIndex = getOperatorIndex(mainOperationInput);

    const firstNumber = parseFloat(mainOperationInput.slice(0, operatorIndex).join(""));
    const secondNumber = parseFloat(mainOperationInput.slice(operatorIndex+1).join(""));
    console.log("first: " + firstNumber);
    console.log("second: " + secondNumber);

    switch(operator) {
        case "+":
            mainOperationInput = [...add(firstNumber, secondNumber).toString().split("")];
            break;
        case "-":
            mainOperationInput = [...subtract(firstNumber, secondNumber).toString().split("")];
            console.log("subtract");
            break;
        case "*":
            mainOperationInput = [...multiply(firstNumber, secondNumber).toString().split("")];
            break;
        case "/":
            if (secondNumber === 0) return;
            mainOperationInput = [...divide(firstNumber, secondNumber).toString().split("")];
            break;
    }
    updateDisplay();
    console.log(mainOperationInput);
}

function toggleNegative() {
    if (!isOperatorIncludedIn(mainOperationInput)) {
        if (mainOperationInput[0] === "-") mainOperationInput.shift();
        else mainOperationInput.unshift("-");
    } else if (isOperatorIncludedIn(mainOperationInput)) {
        const operatorIndex = getOperatorIndex(mainOperationInput);

        if(mainOperationInput[operatorIndex + 1] === "-") {
            mainOperationInput.splice(operatorIndex+1, 1);
        } else {
            mainOperationInput.splice(operatorIndex+1, 0, "-");
        }
    }
    updateDisplay();
    console.log("toggle negative");
}

function processSecondaryOperator(event) {

}

function updateDisplay() {
    const calculationDisplay = document.querySelector(".calculation-display");
    calculationDisplay.textContent = mainOperationInput.join("");
}

function deleteLastDigit() {
    if (mainOperationInput.length === 0) return;
    mainOperationInput.pop();
    updateDisplay();
}