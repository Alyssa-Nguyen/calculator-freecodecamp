

const calculator = document.querySelector('.calculator');    // ref calc div
const keys = document.querySelector('.calculator__keys');    // ref calc__keys div
const display = document.querySelector('.calculator__display');  // ref calc display


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;                                // ref key clicked  
        
        const action = key.dataset.action;                          // ref operator key
        const keyContent = key.textContent;                         // ref key text content
        const displayedNum = display.textContent;                   // ref calc display text content
        const previousKeyType = calculator.dataset.previousKeyType;       // ref the previous-key-type attribute             
        

        if (!action) {                                                    // if a clicked button is a number key
            calculator.dataset.previousKeyType = 'number';                // add custom attribute for number key                            
            if (displayedNum === '0') {                                        // if display shows 0 
                display.textContent = keyContent;                              // show key text content (number clicked)              
            } else if (previousKeyType === 'operator') {                       // if previous key is an operator
                display.textContent = keyContent;                              // show key text content (number clicked) on display                         
            } else {                                                           // else if the previous button clicked is a number or decimal
                display.textContent = displayedNum + keyContent;               // show previous number/numbers and current key number appended              
            }            
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed');                     // make the buttons/keys depressed when clicked
            calculator.dataset.previousKeyType = 'operator';       // add custom attribute previous-key-type to 'operate'
            calculator.dataset.firstValue = displayedNum;         // add custom attribute first-value to displayed number
            calculator.dataset.operator = action;                 // add custom attribute operator and make it equal to action variable
        }        

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));    // undo keys depressed        
            

        if (action === 'decimal') {
            display.textContent = displayedNum + '.';         // concatenate number and decimal to display         
        }

        if (action === 'clear') {
            display.textContent = 0;                    // reset display to 0 when AC button is clicked
        }

        const calculate = (n1, operator, n2) => {            // function to do the calculations 
            let result = '';
            if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2);
            } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2);
            } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2);
            } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2);
            }
            return result;
        }

        if (action === 'calculate') {                             // if the = button is clicked, it will do a calculation of the last 2 numbers
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            display.textContent = calculate(firstValue, operator, secondValue);    // display result of the calculation
        }
        
    }
})
