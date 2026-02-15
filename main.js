//Basic functions
// add
function add(n1, n2) {
   return n1 + n2;
}

// subtract
function subtract(n1, n2) {
   return n1 - n2;
}

// multiply
function multiply(n1, n2) {
    return n1 * n2;
}

// divide
function divide(n1, n2) {
  return n1 / n2;
}

// declaring variables
let firstNumber = 0
let secondNumber = 0
let userOperator
let firstIsDefined = false
let secondIsDefined = false
let shouldClear = false
const operators = ["+", "-", "*", "/"]

// operate function
function operate(firstOperand, secondOperand, operator) {
    if (operator == "+") {
       return add(firstOperand, secondOperand)
    } else if (operator == "-") {
        return subtract(firstOperand, secondOperand)
    } else if (operator == "*") {
        return multiply(firstOperand, secondOperand)
    } else if (operator == "/") {
        return divide(firstOperand, secondOperand)
    }
}


console.log(operate(firstNumber, secondNumber, userOperator));

// Getting DOM Elements
let calculatorScreen = document.querySelector(".calculator_display_input")
let calculatorText = calculatorScreen.textContent
calculatorScreen.textContent = ''
let calculatorButtons = document.querySelectorAll('.calculator_body_btn')
let calculatorOperator = document.querySelector('.calculator_display_operator')



    

// Getting btn values
calculatorButtons.forEach(calculatorButton => {
    calculatorButton.addEventListener("click", () => {
        // First number input
        if (!isNaN(parseInt(calculatorButton.textContent)) && firstIsDefined == false){
        let currentScreen = calculatorScreen.textContent + calculatorButton.textContent
        calculatorScreen.textContent = currentScreen
        firstNumber = parseInt(currentScreen)
        console.log(currentScreen);  

        // Operator input
    } else if (operators.includes(calculatorButton.textContent)) {
        if(secondIsDefined === true) {
            let finalResult = operate(firstNumber, secondNumber, userOperator)
            calculatorScreen.textContent = finalResult
            firstNumber = finalResult;
            secondIsDefined = false
        }
        calculatorOperator.textContent = calculatorButton.textContent
        userOperator = calculatorButton.textContent;
        firstIsDefined = true
        shouldClear = true
        // Second operand input
    } else if (!isNaN(parseInt(calculatorButton.textContent)) && firstIsDefined == true){
        if (shouldClear === true){
            calculatorScreen.textContent = ""
            shouldClear = false
        }
        let currentScreen = calculatorScreen.textContent + calculatorButton.textContent
        calculatorScreen.textContent = currentScreen;
        secondNumber = parseInt(currentScreen);  
        secondIsDefined = true
        
        // Output login
    } else if (calculatorButton.textContent === "="){
       let finalResult = operate(firstNumber, secondNumber, userOperator)
       calculatorScreen.textContent = finalResult
       firstNumber = finalResult;
       calculatorOperator.textContent = ''
       firstIsDefined = false
       secondIsDefined = false

        // Rest logic   
    } else if (calculatorButton.textContent == "AC"){
        firstNumber = ''
        secondNumber = ''
        userOperator = ''
        calculatorOperator.textContent = ''
        firstIsDefined = false;
        shouldClear = false;
        calculatorScreen.textContent = ""

    }})
})





// 1. Get element (button)
// 2. Make the element take the value of the btn till an operator is clicked 
// and update the variable 
// 3. reflect the change on the screen of the calculator
// 4. 