// Calculator Requirements 

// Take user input from clicking buttons or pressing numbers on keyboard
// Display the operands in smaller display above main display: 5 + 9 =
// Display the number you're entering while you're entering it then show the answer once you've done an operation - show the operands above the answer ^
// Be able to clear and delete inputs / calculator display or "rest it"

    // Regular commit then below
// git commit --amend --date='2022-04-03'
// Calculator Wants
// continue to operate after clicking another number and repeat last operator if you continue to click =
// Take user input from keys on keyboard

// Declare variables for different inputs
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const equals = document.querySelector('[data-equals]');
const clear = document.querySelector('[data-clear]');
const backspace = document.querySelector('[data-backspace]');

// Get user inputs from clicks 
numbers.forEach(button => button.addEventListener('click,', () => {
    // Append current number with what was clicked 
    
    //Update display with entered number
}))

operators.forEach(button => button.addEventListener('click', () => {
    // Append current operator to previous operator screen
    // if there's a previous operand, add that anc the current operator to the screen
    // if there's a previous operand, execute the current operand

    // Update the display screens
}))

equals.addEventListener('click', () => {
    // Execute the previous operands
    // Add the previous operand and an equals sign to the secondary display
    // If equals get's hit again, (more than once in a row), execute the previous calculation
    // Add the answer to the primary display
    // Update the display 
})

clear.addEventListener('click', () => {
    // Reset the primary display to zero, clear out the secondary display
    // Update display
})

backspace.addEventListener('click', () =>  {
    // Backspace the last digit entered in the primary display
    // Update the Display
})

// Get user input from the Keyboard

document.addEventListener('keyup', (e) => {
    const keyValue = e.key;
    const codeValue = e.code;
    console.log(keyValue, codeValue)
    switch(keyValue) {
        case '1' :
            console.log('winner');
            break;
        
    }
})


// Add user input to the primary input calculator screen 
// Keep track of first number until an operator is pressed 
// Update the secondary input screen with the first number and operator
// Update primary input screen with second number until another operator or equals sign is pressed
// if another non-equals operator is pressed carry out the prior operation then preform the selected operators operation on the calculated value -- essentially run the calculate method no matter what after the first operator is pressed and the second input is entered 


// -- Clear Button -- Clear everything from both primary and secondary inputs 

// -- Delete Button-- Clear the last digit entered into the primary screen
