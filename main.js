class Calculator{
    constructor(currentOperandTextElement, previousOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operand = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    add(n1,n2){
        return n1 + n2;
    }

    subtract(n1,n2){
        return n1 - n2
    }

    multiply(n1,n2){
        return n1 * n2;
    }

    divide(n1,n2){
        return n1 / n2; 
    } 

    operate(operator, n1, n2){
        switch(operator){
            case '+' :
                add(n1,n2)
                break
            case '-' : 
                subtract(n1,n2)
                break
            case '*' :
                multiply(n1,n2)
                break
            case '/' :
                divide(n1,n2)
                break
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
    }

}

// Get number buttons
const numberButtons = document.querySelectorAll('[data-number]');

const currentOperandTextElement = document.querySelector('[data-current-operand]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');

const clearButton = document.querySelector('[data-clear]')

const deleteButton = document.querySelector('[data-delete]')

// Create calculator object
const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement)


// Add Event Listeners on each button 
numberButtons.forEach( button => button.addEventListener('click', () => {
// Append current value to button clicked 
console.log(button.innerText)
calculator.appendNumber(button.innerText)
calculator.updateDisplay()

}))

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})