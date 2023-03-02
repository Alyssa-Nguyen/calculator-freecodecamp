

const calculator = document.querySelector('.calculator');    // ref calc div
const keys = document.querySelector('.calculator__keys');    // ref calc__keys div
const display = document.querySelector('.calculator__display');  // ref calc display

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;                  // ref key clicked   
        const action = key.dataset.action;     // ref operator key (clicked)
        const keyContent = key.textContent;    // ref key (clicked) text content
        const displayedNum = display.textContent;    // ref calc display text content
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {                        // if a number key is clicked
            if (displayedNum === '0') {        // if display shows 0 
                display.textContent = keyContent;    // display show key text content
                console.log('If disNum '+displayedNum);
            } else if (previousKeyType === 'operator') {
                display.textContent = keyContent;
                console.log('Else If disNum '+displayedNum);
            } else {                                                 // else if display doesn't show 0 (show a number instead)
                display.textContent = displayedNum + keyContent;     // display show display text content (already there) plus key
                console.log('Else disNum '+displayedNum);
            }            
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';    // add custom attribute for operator key
            calculator.dataset.firstValue = displayedNum;     // add custom attribute for first value
            calculator.dataset.operator = action;           
        }

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
        
            

        if (action === 'decimal') {
            display.textContent = displayedNum + '.';    // show display text content plus decimal            
        }

        if (action === 'clear') {
            console.log('clear key');
        }

        const calculate = (n1, operator, n2) => {
            let result = '';
            if (operator === 'add') {
                result = n1 + n2;
            } else if (operator === 'subtract') {
                result = n1 - n2;
            } else if (operator === 'multiply') {
                result = n1 * n2;
            } else if (operator === 'divide') {
                result = n1 / n2;
            }
            return result;
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            display.textContent = calculate(firstValue, operator, secondValue);
        }
        
    }
})
