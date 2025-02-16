const resultDisplay = document.getElementById('result');
const historyList = document.getElementById('historyList');
const calculateBtn = document.querySelector('.calculate-btn');
const clearBtn = document.getElementById('clearBtn'); // Updated to target by ID
const exampleBtns = document.querySelectorAll('.example-btn');
const themeSwitcher = document.getElementById('themeSwitcher');

let calculationHistory = [];

themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLightTheme = document.body.classList.contains('light-theme');
    themeSwitcher.textContent = isLightTheme ? 'Switch to Dark Mode' : 'Switch to Light Mode';
});

// Handle example buttons
exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        resultDisplay.value = btn.textContent;
        resultDisplay.placeholder = ''; // Clear the placeholder
    });
});

// Handle calculate button
calculateBtn.addEventListener('click', calculate);

// Handle clear button
clearBtn.addEventListener('click', clearDisplay); // Ensure event listener is added

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});

async function calculate() {
    const expression = resultDisplay.value.trim();
    if (!expression) {
        alert('Please enter a calculation');
        return;
    }

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';

    try {
        const response = await fetch('https://ee0ca92f-ed28-4d35-a25f-dad10cf4c57c-00-1w7ynweznqits.kirk.replit.dev/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expression })
        });

        const data = await response.json();
        if (response.ok) {
            const result = data.result || 'No result returned';
            resultDisplay.value = result;
            addToHistory(expression, result);
        } else {
            resultDisplay.value = data.error || 'Calculation Error';
        }
    } catch (error) {
        console.error('Error fetching calculation:', error);
        resultDisplay.value = 'Network Error';
    } finally {
        // Hide loading spinner
        document.getElementById('loadingSpinner').style.display = 'none';
    }
}

function clearDisplay() {
    resultDisplay.value = ''; // Clear the input field
    resultDisplay.placeholder = 'Enter calculation...'; // Reset placeholder
}

function addToHistory(expression, result) {
    calculationHistory.unshift({ expression, result });
    if (calculationHistory.length > 5) calculationHistory.pop();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyList.innerHTML = calculationHistory
        .map(calc => `
            <div class="history-item">
                ${calc.expression} = ${calc.result}
            </div>
        `)
        .join('');
}