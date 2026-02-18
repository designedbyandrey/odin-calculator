//Basic functions

// add
function add(n1, n2) {
    const answer = n1 + n2
    const decimals = answer.toString().split(".")[1]?.length || 0;
    return decimals > 8 ? Number(answer.toFixed(4)) : answer
}

// subtract
function subtract(n1, n2) {
    const answer = n1 - n2
    const decimals = answer.toString().split(".")[1]?.length || 0;
    return decimals > 8 ? Number(answer.toFixed(4)) : answer
}

// multiply
function multiply(n1, n2) {
    const answer = n1 * n2
    const decimals = answer.toString().split(".")[1]?.length || 0;
    return decimals > 8 ? Number(answer.toFixed(4)) : answer
}

// divide
function divide(n1, n2) {
    if (n2 === 0) return "Error"
    const answer = n1 / n2
    const decimals = answer.toString().split(".")[1]?.length || 0;
    return decimals > 8 ? Number(answer.toFixed(4)) : answer
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


// Getting DOM Elements
let calculatorScreen = document.querySelector(".calculator_display_input")
calculatorScreen.textContent = 0
let calculatorButtons = document.querySelectorAll('.calculator_body_btn')
let calculatorOperator = document.querySelector('.calculator_display_operator')



    

// Getting btn values and calculator logic
calculatorButtons.forEach(calculatorButton => {
    calculatorButton.addEventListener("click", () => {
        // First operand input
        if (!isNaN(parseInt(calculatorButton.textContent)) && firstIsDefined == false){
         if (calculatorScreen.textContent === "0" || calculatorScreen.textContent === "Error"){
            calculatorScreen.textContent = ''
         }
        let currentScreen = calculatorScreen.textContent + calculatorButton.textContent
        calculatorScreen.textContent = currentScreen
        firstNumber = parseFloat(currentScreen)

        // Operator input
    } else if (operators.includes(calculatorButton.textContent)) {
        if (calculatorScreen.textContent === '0' && firstIsDefined === false) firstNumber = parseInt(calculatorScreen.textContent)
        
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
        secondNumber = parseFloat(currentScreen);  
        secondIsDefined = true
        
        // Output logic
    } else if (calculatorButton.textContent === "="){
       let finalResult = operate(firstNumber, secondNumber, userOperator)
       calculatorScreen.textContent = finalResult
       if (calculatorScreen.textContent === 'Error') {
        firstIsDefined = false
        calculatorOperator.textContent = ''
        firstNumber = 0
        secondIsDefined = false
       } else {
       firstNumber = finalResult;
       calculatorOperator.textContent = ''
       secondIsDefined = false
        }
        // Reset logic   
    } else if (calculatorButton.textContent == "AC"){
        firstNumber = ''
        secondNumber = ''
        userOperator = ''
        calculatorOperator.textContent = ''
        firstIsDefined = false;
        shouldClear = false;
        calculatorScreen.textContent = "0"

    } else if(calculatorButton.textContent === '.') {

        if (shouldClear) {
        calculatorScreen.textContent = '0.'
        shouldClear = false 
        return
        }

        if(calculatorScreen.textContent === "Error") {
            calculatorScreen.textContent = '0.'
        }

        if(calculatorScreen.textContent.includes(".")) {
            return
        } else {
        let currentScreen = calculatorScreen.textContent + calculatorButton.textContent
        calculatorScreen.textContent = currentScreen
        } 

    } else if (calculatorButton.textContent === 'del') {
        if(calculatorScreen.textContent === 'Error') {
            firstNumber = ''
            secondNumber = ''
            userOperator = ''
            calculatorOperator.textContent = ''
            firstIsDefined = false;
            shouldClear = false;
            calculatorScreen.textContent = "0"
        } else {
            let currentScreen = calculatorScreen.textContent.slice(0, -1)
            calculatorScreen.textContent = currentScreen
     
            if (firstIsDefined === false) {
                if(currentScreen === '') {
                    firstNumber = 0
                    calculatorScreen.textContent = '0'
                } else {
                    firstNumber = parseFloat(currentScreen)
                }
            } else {
                if (currentScreen === ''){
                    secondNumber = 0
                    calculatorScreen.textContent = '0'
                } else { 
                    secondNumber = parseFloat(currentScreen)
                }
            }
    }}})
})