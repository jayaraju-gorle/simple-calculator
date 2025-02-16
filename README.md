# AI-Powered Calculator

This project is a simple web-based calculator that utilizes Google's Gemini API to perform calculations based on natural language input.

## Features

*   **Natural Language Input:** Users can enter mathematical expressions in plain English (e.g., "what is 5 plus 7", "10 multiplied by 3").
*   **AI-Powered Calculation:** The calculator sends the user's input to a backend server, which uses the Gemini API to interpret the expression and calculate the result.
*   **Simple User Interface:** The frontend provides a clean and straightforward interface with a text input for the calculation and "Calculate" and "Clear" buttons.
*   **Error Handling:** The application includes basic error handling for invalid input and API communication issues.

## Technologies Used

*   **Frontend:**
    *   HTML
    *   CSS
    *   JavaScript (with `fetch` API)
*   **Backend:**
    *   Python
    *   Flask (with Flask-CORS)
    *   Google Gemini API
*   **Deployment:**
    *   Replit

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <your_repository_url>
    cd <your_repository_name>
    ```

2.  **Set up the backend (Replit):**
    *   Create a new Python Repl on [Replit](https://replit.com/).
    *   Copy the contents of `server.py` into your Replit project's main Python file (usually `main.py` or you can rename it to `server.py`).
    *   Install the required packages in the Replit Shell:
        ```bash
        pip install Flask Flask-CORS requests python-dotenv
        ```
    * Create a `.env` file in your Replit, and place your gemini api key in it:
         ```
          GEMINI_API_KEY="your-gemini-api-key"
         ```
    *   Run the Replit server.

3.  **Set up the frontend:**

    *   You can run the `index.html` file directly in a web browser (using a local development server like Live Server in VS Code is recommended).  No separate server is needed for the frontend *files* themselves, as they are static.

4.  **API Key:**

    *   Obtain a Gemini API key from Google Cloud Platform.
    *   In your Replit environment, set the `GEMINI_API_KEY` environment variable to your API key. *Do not* hardcode the API key directly into your code. The `.env` file is the correct way to handle this. Replit automatically loads environment variables from `.env` files.

## Usage

1.  Open `index.html` in your web browser.
2.  Type a mathematical expression in natural language into the input field.
3.  Click the "Calculate" button.
4.  The result will be displayed in the input field.
5.  Click "Clear" to clear the input field.

## Important Notes

*   The accuracy of the calculator depends entirely on the Gemini API's ability to understand the natural language input.
*   The calculator's capabilities are limited by what the Gemini API can interpret and calculate.
*   This project is intended as a demonstration of using the Gemini API for simple calculations.

## Contributing

Contributions are welcome!  Please feel free to submit pull requests or open issues.

## License
[Choose an appropriate open-source license, e.g., MIT, Apache 2.0, GPLv3.  Include the full license text in a separate LICENSE file.]
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details