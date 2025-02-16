const resultDisplay = document.getElementById('result');

async function calculate() {
    const expression = resultDisplay.value.trim(); // Trim whitespace
    if (!expression) {
        alert('Please enter a valid expression.'); // Notify the user
        return;
    }

    // Optional: Validate expression (e.g., allow only numbers and operators)
    if (!/^[\d+\-*/().\s]+$/.test(expression)) {
        alert('Invalid characters in the expression.');
        return;
    }

    try {
        const result = await fetchCalculation(expression);
        resultDisplay.value = result; // Update the display with the result
    } catch (error) {
        console.error('Error during calculation:', error);
        resultDisplay.value = 'Error'; // Show error to the user
    }
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
            return data.result || 'No result returned'; // Handle missing result
        } else {
            return data.error || 'Calculation Error'; // Handle server-side errors
        }
    } catch (error) {
        console.error('Error fetching calculation:', error);
        return 'Network Error'; // Handle network errors
    }
}