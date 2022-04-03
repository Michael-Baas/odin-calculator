class Calculator{
    constructor(currentOperandTextElement, previousOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return // Prevents operand from having multiple decimal points
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

    getOperator(operator){
        switch(operator){
            case '+' :
                this.operator = '+';
                this.currentOperand = this.currentOperand.toString() + " " + this.operator.toString() + " ";
                break
            case '-' : 
                this.operator = '-';
                this.currentOperand = this.currentOperand.toString() + " " + this.operator.toString() + " ";
                break
            case 'x' :
                this.operator = '*'
                this.currentOperand = this.currentOperand.toString() + " " + this.operator.toString() + " ";
                break
            case '÷' :
                this.operator = '/'
                this.currentOperand = this.currentOperand.toString() + " " + this.operator.toString() + " ";
                break 
    }
    }

    updatePrevious(){
        this.previousOperand = this.currentOperand;
    }
    
    operate(operator){
        switch(operator){
            case '+' :
                this.currentOperand = add(currentOperand,previousOperand)
                break
            case '-' : 
                this.currentOperand = subtract(currentOperand, previousOperand)
                break
            case '*' :
                this.currentOperand = multiply(currentOperand, previousOperand)
                break
            case '/' :
                this.currentOperand = divide(currentOperand, previousOperand)
                break
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }

}


const numberButtons = document.querySelectorAll('[data-number]');

const operatorButtons = document.querySelectorAll('[data-operator]');

const currentOperandTextElement = document.querySelector('[data-current-operand]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');

const clearButton = document.querySelector('[data-clear]')

const deleteButton = document.querySelector('[data-delete]')

const equalsButton = document.querySelector('[data-equals]')

// Create calculator object
const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement)


// Add Event Listeners on each number button 
numberButtons.forEach( button => button.addEventListener('click', () => {
// Append current value to button clicked 
if(currentOperandTextElement.innerText.includes('+') ||
   currentOperandTextElement.innerText.includes('-') ||
   currentOperandTextElement.innerText.includes('*') ||
   currentOperandTextElement.innerText.includes('/')) {
    calculator.appendNumber(button.innerText);
    calculator.updatePrevious();
    calculator.updateDisplay();
    // calculator.appendNumber(calculator.operate())

}else{
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
}


}))


// Add Event Listeners on each operator button 
operatorButtons.forEach( button => button.addEventListener('click', () =>{
    //
    console.log(button)
    calculator.getOperator(button.innerText)
    calculator.updateDisplay();
    
    }))


clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.operate();
    calculator.updateDisplay();
})