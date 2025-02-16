const resultDisplay = document.getElementById('result');
const loadingSpinner = document.getElementById('loadingSpinner');
const historyList = document.getElementById('historyList');
const themeToggle = document.getElementById('themeToggle');
const copyButton = document.getElementById('copyButton');

// Theme handling
let isDarkMode = true;
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// History handling
let calculationHistory = [];
function addToHistory(expression, result) {
    calculationHistory.unshift({ expression, result });
    if (calculationHistory.length > 5) calculationHistory.pop();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyList.innerHTML = calculationHistory
        .map(calc => `<div class="history-item">
            <span>${calc.expression}</span>
            <span>=</span>
            <span>${calc.result}</span>
        </div>`)
        .join('');
}

// Copy result
function copyResult() {
    navigator.clipboard.writeText(resultDisplay.value);
    copyButton.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000);
}

// Example buttons
document.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        resultDisplay.value = btn.textContent;
    });
});

async function calculate() {
    const expression = resultDisplay.value.trim();
    if (!expression) {
        alert('Please enter a valid expression.');
        return;
    }

    loadingSpinner.classList.remove('hidden');
    
    try {
        const result = await fetchCalculation(expression);
        resultDisplay.value = result;
        addToHistory(expression, result);
    } catch (error) {
        console.error('Error during calculation:', error);
        resultDisplay.value = 'Error';
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

function clearDisplay() {
    resultDisplay.value = '';
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

// Your existing fetchCalculation function remains the same