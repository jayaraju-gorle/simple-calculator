const resultDisplay = document.getElementById('result');

async function calculate() {
    const expression = resultDisplay.value;  // Get the text from the input
    if (!expression) return; // Do nothing if the input is empty

    const result = await fetchCalculation(expression);
    resultDisplay.value = result; // Update the display with the result
}

function clearDisplay() {
    resultDisplay.value = ''; // Clear the input field
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
        if (response.ok) {
            return data.result;
        } else {
            return data.error || 'Calculation Error';
        }
    } catch (error) {
        console.error('Error fetching calculation:', error);
        return 'Error';
    }
}

// No need for updateDisplay() as we're directly updating the input field