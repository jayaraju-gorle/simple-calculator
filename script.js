let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetScreen = false;

const resultDisplay = document.getElementById('result');

async function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    
    if (number === '.' && currentInput.includes('.')) return;
    
    currentInput += number;
    updateDisplay();
}

async function appendOperator(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '') {
        await calculate();
    }
    
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

async function calculate() {
    if (previousInput === '' || currentInput === '') return;
    
    const expression = `${previousInput} ${operation} ${currentInput}`;
    const result = await fetchCalculation(expression);
    
    currentInput = result;
    operation = null;
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    resultDisplay.value = currentInput;
}

async function fetchCalculation(expression) {
    try {
        const response = await fetch('https://ee0ca92f-ed28-4d35-a25f-dad10cf4c57c-00-1w7ynweznqits.kirk.replit.dev/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expression })
        });
        
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching calculation:', error);
        return 'Error';
    }
}

updateDisplay();