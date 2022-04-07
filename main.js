// Calculator Requirements

// Take user input from clicking buttons or pressing numbers on keyboard ✅
// Display the operands in smaller display above main display: 5 + 9 =
// Display the number you're entering while you're entering it then show the answer once you've done an operation - show the operands above the answer ^
// Be able to clear and delete inputs / calculator display or "rest it"

// Regular commit then below
// git commit --amend --date='2022-04-03'
// Calculator Wants
// continue to operate after clicking another number and repeat last operator if you continue to click =
// Take user input from keys on keyboard

// Add user input to the primary input calculator screen
// Keep track of first number until an operator is pressed
// Update the secondary input screen with the first number and operator
// Update primary input screen with second number until another operator or equals sign is pressed
// if another non-equals operator is pressed carry out the prior operation then preform the selected operators operation on the calculated value -- essentially run the calculate method no matter what after the first operator is pressed and the second input is entered

// Declare global variables for different inputs
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operator]");
const equals = document.querySelector("[data-equals]");
const clear = document.querySelector("[data-clear]");
const backspace = document.querySelector("[data-backspace]");

// global Declare variables for output screens
const currentOutput = document.querySelector("[data-current-output]");
const previousOutput = document.querySelector("[data-previous-output]");

// ---------------------------- Calculator Class --------------------------------------
class Calculator {
  constructor(currentOutput, previousOutput) {
    // ---------------------------- Object Properties ---------------------------------
    this.currentOutput = currentOutput;
    this.previousOutput = previousOutput;
    this.clear();
  }
  // ---------------------------- Methods -----------------------------------------------
  appendInput(number) {
    // Don't allow two operators in a row
    if (this.currentOutput.innerText.includes(".") && number === ".") return;
    // Remove leading 0
    if (currentOutput.innerText === "0") {
      calc.removeLeadingZero();
    }
    // Append current number with what was clicked
    switch (number) {
      case "*":
        this.primaryNumber = `${this.primaryNumber.toString()} * `;
        break;
      case "/":
        this.primaryNumber = `${this.primaryNumber.toString()} / `;
        break;
      case "+":
        this.primaryNumber = `${this.primaryNumber.toString()} + `;
        break;
      case "-":
        this.primaryNumber = `${this.primaryNumber.toString()} - `;
        break;
      case "=":
        this.primaryNumber = `${this.primaryNumber.toString()} = `;
        break;
      default:
        this.primaryNumber = this.primaryNumber.toString() + number;
    }
  }

  backspace() {
    // Remove the last number entered into input
    this.primaryNumber = this.currentOutput.innerText.toString().slice(0, -1);
  }

  calculateTotal() {
    // Calculate the total of operating on primary Number and secondary Number
    let stringArray = previousOutput.innerText.split(" ");
    let first = +stringArray[0];
    let op = stringArray[1];
    
    if(this.previousOutput.innerText.split(' ').length > 2 ){
      console.log(true)
      let second = +this.previousOutput.innerText.split(" ")[2];
      switch (op) {
        case "*":
          return first * second;
        case "/":
          return first / second;
        case "+":
          return first + second;
        case "-":
          return first - second;
      }

    }else{ 
      let second = +this.currentOutput.innerText.split(" ")[0];
      switch (op) {
        case "*":
          return first * second;
        case "/":
          return first / second;
        case "+":
          return first + second;
        case "-":
          return first - second;
      }
    }
  
    
  }

  clear() {
    // Set current input to 0, remove anything from previous input
    this.primaryNumber = "0";
    this.secondaryNumber = "";
    this.operator = null;
  }

  removeLeadingZero() {
    this.primaryNumber = this.currentOutput.innerText.slice(
      1,
      currentOutput.innerText.length
    );
  }

  updateDisplay() {
    // Update display to reflect changes applied from other methods
    this.currentOutput.innerText = this.primaryNumber;
    this.previousOutput.innerText = this.secondaryNumber;
  }
}

const calc = new Calculator(currentOutput, previousOutput);

// ---------------------------- Click input --------------------------------------
// -- Number Buttons -- Collect number that was clicked
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    // If previousOuput includes an = already, make sure to add the next operator to the secondary display
    if (previousOutput.innerText.split(" ").includes("=")) {
      calc.secondaryNumber = calc.primaryNumber + calc.operator.innerText;
      console.log(calc.secondaryNumber);
      calc.updateDisplay;
    } else if (currentOutput.innerText.split(" ").length > 1) {
      // If there's already text in current output, replace it with current number being selected
      calc.primaryNumber = number.innerText;
      // calc.appendInput(primaryNumber)
      calc.updateDisplay();
    } else {
      // Append current number with what was clicked
      calc.appendInput(number.innerText);
      //Update display with entered number
      calc.updateDisplay();
    }
  });
});

// -- Operator Buttons -- Collect operator that was clicked
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (previousOutput.innerText.split(" ").includes("=")) { // If an operation has already been preformed, 
      calc.secondaryNumber = `${calc.primaryNumber} ${operator.innerText} `;;
      calc.primaryNumber += ` ${operator.innerText} `;
      calc.updateDisplay();
      calc.primaryNumber = calc.calculateTotal();
      calc.updateDisplay();
      // if there's a previous operand, add that and the current operator to the screen
    } else if (
      previousOutput.innerText.split(" ").length < 5 &&
      previousOutput.innerText.split(" ").length > 1
    ) {
      calc.secondaryNumber += `${calc.primaryNumber} = `;
      calc.primaryNumber = calc.calculateTotal();
      // calc.secondaryNumber += calc.primaryNumber + " " + operator.innerText;
      calc.updateDisplay();
    }

    // // if there's a previous operand, add that and the current operator to the screen
    else if (previousOutput.innerText !== "") {
      calc.appendInput(equals.innerText);
      calc.primaryNumber = calc.calculateTotal();
      calc.appendInput(operator.innerText);
      calc.updateDisplay();
    } else {
      // Append current operator to previous operator screen
      calc.appendInput(operator.innerText);
      calc.secondaryNumber += calc.primaryNumber;
      calc.primaryNumber = "";
      // if there's a previous operand, execute the current operand
      // Update the display screens
      calc.updateDisplay();
    }
  });
});

// -- Equals Button -- Calculate total: if repeated more than once in a row, repeat the last operator.
equals.addEventListener("click", () => {
  // Execute the previous operands
  // Add the previous operand and an equals sign to the secondary display
  // If equals get's hit again, (more than once in a row), execute the previous calculation
  // Add the answer to the primary display
  // Update the display

  if (previousOutput.innerText.split(" ").includes("=")) {
    calc.secondaryNumber = ` ${calc.primaryNumber}  ${previousOutput.innerText.split(' ')[1]}  ${previousOutput.innerText.split(' ')[2]} = `;
    calc.updateDisplay(); 
  }else{
    calc.appendInput(equals.innerText);
    calc.secondaryNumber += calc.primaryNumber;
    calc.primaryNumber = calc.calculateTotal();
    calc.updateDisplay();
  }
  calc.primaryNumber = calc.calculateTotal();
  calc.updateDisplay();

});

// -- Clear Button -- Clear everything from both primary and secondary inputs
clear.addEventListener("click", () => {
  // Reset the primary display to zero, clear out the secondary display
  calc.clear();
  // Update display
  calc.updateDisplay();
});

// -- Backspace button-- Clear the last digit entered into the primary screen
backspace.addEventListener("click", () => {
  // Backspace the last digit entered in the primary display
  calc.backspace();
  // Update the Display
  calc.updateDisplay();
});

// ---------------------------- Keyboard input --------------------------------------
// Get user input from the Keyboard
document.addEventListener("keyup", (e) => {
  const keyValue = e.key;
  const codeValue = e.code;
  console.log(keyValue, codeValue, e);
  switch (keyValue) {
    case "1":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "2":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "3":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "4":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "5":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "6":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "7":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "8":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "9":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "0":
      calc.appendInput(keyValue);
      calc.updateDisplay();
      break;
    case "Backspace":
      break;
    case "Delete":
      break;
    case "*":
      if (calc.currentOutput.innerText.includes("*") && keyValue === "*") return;
      // calc.appendInput(keyValue);
      // calc.updateDisplay();
      if (previousOutput.innerText.split(" ").includes("=")) { // If an operation has already been preformed, 
        calc.secondaryNumber = `${calc.primaryNumber} ${keyValue} `;;
        calc.primaryNumber += ` ${keyValue} `;
        calc.updateDisplay();
        calc.primaryNumber = calc.calculateTotal();
        calc.updateDisplay();
        // if there's a previous operand, add that and the current operator to the screen
      } else if (
        previousOutput.innerText.split(" ").length < 5 &&
        previousOutput.innerText.split(" ").length > 1
      ) {
        calc.secondaryNumber += `${calc.primaryNumber} = `;
        calc.primaryNumber = calc.calculateTotal();
        // calc.secondaryNumber += calc.primaryNumber + " " + operator.innerText;
        calc.updateDisplay();
      }else {
        // Append current operator to previous operator screen
        calc.appendInput(keyValue);
        calc.secondaryNumber += calc.primaryNumber;
        calc.primaryNumber = "";
        // if there's a previous operand, execute the current operand
        // Update the display screens
        calc.updateDisplay();
      }
      break;
    case "/":
      if (calc.currentOutput.innerText.includes("/") && keyValue === "/") return;
      // calc.appendInput(keyValue);
      // calc.updateDisplay();
      if (previousOutput.innerText.split(" ").includes("=")) { // If an operation has already been preformed, 
        calc.secondaryNumber = `${calc.primaryNumber} ${keyValue} `;;
        calc.primaryNumber += ` ${keyValue} `;
        calc.updateDisplay();
        calc.primaryNumber = calc.calculateTotal();
        calc.updateDisplay();
        // if there's a previous operand, add that and the current operator to the screen
      } else if (
        previousOutput.innerText.split(" ").length < 5 &&
        previousOutput.innerText.split(" ").length > 1
      ) {
        calc.secondaryNumber += `${calc.primaryNumber} = `;
        calc.primaryNumber = calc.calculateTotal();
        // calc.secondaryNumber += calc.primaryNumber + " " + operator.innerText;
        calc.updateDisplay();
      }else {
        // Append current operator to previous operator screen
        calc.appendInput(keyValue);
        calc.secondaryNumber += calc.primaryNumber;
        calc.primaryNumber = "";
        // if there's a previous operand, execute the current operand
        // Update the display screens
        calc.updateDisplay();
      }
      break;
    case "+":
      if (calc.currentOutput.innerText.includes("+") && keyValue === "+") return;
      // calc.appendInput(keyValue);
      // calc.updateDisplay();
      if (previousOutput.innerText.split(" ").includes("=")) { // If an operation has already been preformed, 
        calc.secondaryNumber = `${calc.primaryNumber} ${keyValue} `;;
        calc.primaryNumber += ` ${keyValue} `;
        calc.updateDisplay();
        calc.primaryNumber = calc.calculateTotal();
        calc.updateDisplay();
        // if there's a previous operand, add that and the current operator to the screen
      } else if (
        previousOutput.innerText.split(" ").length < 5 &&
        previousOutput.innerText.split(" ").length > 1
      ) {
        calc.secondaryNumber += `${calc.primaryNumber} = `;
        calc.primaryNumber = calc.calculateTotal();
        // calc.secondaryNumber += calc.primaryNumber + " " + operator.innerText;
        calc.updateDisplay();
      }else {
        // Append current operator to previous operator screen
        calc.appendInput(keyValue);
        calc.secondaryNumber += calc.primaryNumber;
        calc.primaryNumber = "";
        // if there's a previous operand, execute the current operand
        // Update the display screens
        calc.updateDisplay();
      }
      break;
    case "-":
      if (calc.currentOutput.innerText.includes("-") && keyValue === "-") return;
      // calc.appendInput(keyValue);
      // calc.updateDisplay();
      if (previousOutput.innerText.split(" ").includes("=")) { // If an operation has already been preformed, 
        calc.secondaryNumber = `${calc.primaryNumber} ${keyValue} `;;
        calc.primaryNumber += ` ${keyValue} `;
        calc.updateDisplay();
        calc.primaryNumber = calc.calculateTotal();
        calc.updateDisplay();
        // if there's a previous operand, add that and the current operator to the screen
      } else if (
        previousOutput.innerText.split(" ").length < 5 &&
        previousOutput.innerText.split(" ").length > 1
      ) {
        calc.secondaryNumber += `${calc.primaryNumber} = `;
        calc.primaryNumber = calc.calculateTotal();
        // calc.secondaryNumber += calc.primaryNumber + " " + operator.innerText;
        calc.updateDisplay();
      }else {
        // Append current operator to previous operator screen
        calc.appendInput(keyValue);
        calc.secondaryNumber += calc.primaryNumber;
        calc.primaryNumber = "";
        // if there's a previous operand, execute the current operand
        // Update the display screens
        calc.updateDisplay();
      }
      break;
    case "=":
      if (previousOutput.innerText.split(" ").includes("=")) {
        calc.secondaryNumber = ` ${calc.primaryNumber}  ${previousOutput.innerText.split(' ')[1]}  ${previousOutput.innerText.split(' ')[2]} = `;
        calc.updateDisplay(); 
      }else{
        calc.appendInput(keyValue);
        calc.secondaryNumber += calc.primaryNumber;
        calc.primaryNumber = calc.calculateTotal();
        calc.updateDisplay();
      }
      calc.primaryNumber = calc.calculateTotal();
      calc.updateDisplay();
      break;
      case e.key = 'Enter':
      if (previousOutput.innerText.split(" ").includes("=")) {
        calc.secondaryNumber = ` ${calc.primaryNumber}  ${previousOutput.innerText.split(' ')[1]}  ${previousOutput.innerText.split(' ')[2]} = `;
        calc.updateDisplay(); 
      }else{
        calc.appendInput("=");
        calc.secondaryNumber += calc.primaryNumber;
        calc.primaryNumber = calc.calculateTotal();
        calc.updateDisplay();
      }
      calc.primaryNumber = calc.calculateTotal();
      calc.updateDisplay();
      break;
  }
});
